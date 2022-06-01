module.exports = (req, res, next) => {
  // 401 Unathorized
  // 403 Forbidden

  if (!req.user.isAdmin) return res.status(403).send('Access denied');

  next();
};
