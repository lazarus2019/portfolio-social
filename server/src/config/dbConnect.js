const mongoose = require("mongoose");

const { MONGODB_URI } = process.env;

const dbConnect = async () => {
  try {
    await mongoose
      .connect(MONGODB_URI)
      .then(() => console.log("✅ Connect database from mongodb"));
  } catch (error) {
    console.log(`❌ Connect database is failed with error which is ${error}`);
  }
};

module.exports = dbConnect;
