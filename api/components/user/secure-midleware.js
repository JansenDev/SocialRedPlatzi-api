const token = require("../../../utils/token");

module.exports = function secure(action) {
  function midleware(req, res, next) {
    switch (action) {
      case "update":
        token.check.own(req, req.body.id);
        next();
        break;

      case "follow":
        token.check.logged(req);
        next();
        break;
      default:
        next();
        break;
    }
  }
  return midleware;
};
