const getPublicId = (photoUrl) => {
  const regexExec = /(\w+)\.\w+$/g;
  return regexExec.exec(photoUrl)[1]; // 1: select the first match value
};

module.exports = {getPublicId}
