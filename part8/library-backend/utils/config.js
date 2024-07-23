require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;
console.log(MONGODB_URI);
module.exports = { MONGODB_URI, SECRET };
