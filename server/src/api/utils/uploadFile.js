const getPublicId = (fileUrl) => {
  const regexExec = /(\w+)\.\w+$/g;
  return regexExec.exec(fileUrl)[1]; // 1: select the first match value
};

module.exports = {getPublicId}
