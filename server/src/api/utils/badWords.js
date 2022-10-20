const Filter = require("bad-words");

const checkBadWords = (...content) => {
  const filter = new Filter();
  return filter.isProfane(...content)
};

module.exports = checkBadWords
