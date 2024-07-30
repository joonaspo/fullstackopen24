export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (books) => {
    const seen = new Set();
    return books.filter((book) => {
      const isDuplicate = seen.has(book.title);
      seen.add(book.title);
      return !isDuplicate;
    });
  };
  cache.updateQuery(query, ({ allBooks }) => {
    console.log(allBooks);
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    };
  });
};
