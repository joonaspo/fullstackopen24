const Book = require("./models/book");
const { GraphQLError } = require("graphql");
const Author = require("./models/author");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const config = require("./utils/config");

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async (root, args) => {
      const authors = await Author.aggregate([
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "author",
            as: "books",
          },
        },
        {
          $addFields: {
            bookCount: { $size: "$books" },
          },
        },
      ]);
      return authors;
    },
    allBooks: async (root, args) => {
      const filter = {};
      if (args.author) {
        filter.author = args.author;
      }
      if (args.genre) {
        filter.genres = { $elemMatch: { $eq: args.genre } };
      }
      return await Book.find(filter).populate("author");
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      let author = await Author.findOne({ name: args.author });

      try {
        if (!author) {
          const newAuthor = new Author({ name: args.author });
          author = await newAuthor.save();
        }
        const book = new Book({ ...args, author: author._id });
        await book.save();
        const populatedBook = await Book.findById(book._id).populate("author");
        pubsub.publish("BOOK_ADDED", { bookAdded: populatedBook });
        return populatedBook;
      } catch (error) {
        throw new GraphQLError("Saving author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.author,
            error,
          },
        });
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const author = await Author.findOne({ name: args.name });

      try {
        if (author) {
          author.born = args.setBornTo;
          return await author.save();
        } else {
          return null;
        }
      } catch (error) {
        throw new GraphQLError("Saving author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
    },
    createUser: async (root, args) => {
      try {
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre,
        });
        return user.save();
      } catch (error) {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
    },
    login: async (root, args) => {
      try {
        const user = await User.findOne({ username: args.username });

        if (!user || args.password !== "secret") {
          throw new GraphQLError("wrong credentials", {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });
        }
        const userForToken = {
          username: user.username,
          id: user._id,
        };
        console.log(userForToken);
        return { value: jwt.sign(userForToken, config.SECRET) };
      } catch (error) {
        throw new GraphQLError("failed to log in", {
          extensions: {
            code: "BAD_USER_AUTH",
          },
        });
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
