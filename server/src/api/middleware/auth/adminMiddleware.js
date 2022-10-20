const adminMiddleware = (req, res, next) => {
  const { isAdmin } = req?.user;
  if (!isAdmin) throw new Error("You don't have permission for this action");

  next();
};

module.exports = adminMiddleware;
