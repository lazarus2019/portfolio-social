const jwt = require("jsonwebtoken");
const generateToken = (userInfo) => {
  return jwt.sign(
    {
      username: userInfo?.username,
      id: userInfo?.id,
    },
    process.env.TOKEN_SECRET_KEY,
    {
      expiresIn: "5d",
    }
  );
};

module.exports = {
  generateToken,
};
