const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log(`Database connected successfully.`);
    })
    .catch((err) => {
      console.log(`Connection failed. ${err}`);
      process.exit(1);
    });
};

module.exports = connectDB;
