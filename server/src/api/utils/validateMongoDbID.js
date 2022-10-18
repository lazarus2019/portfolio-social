const mongoose = require("mongoose");

const validateMongoDbID = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("Your id provide is not valid or found");
};

module.exports = validateMongoDbID;
