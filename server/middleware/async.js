// middleware for catching exception on nodemon, to prevent stopping of service, for example a dropped db connection

module.exports = asyncMiddleware = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
};
