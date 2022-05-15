const auth = require("../../../utils/token");

module.exports = function checkAuth(action) {
  function midleware(req, res, next) {
    switch (action) {
      case "update":
        const id_owner = req.body.id;
        auth.check.own(req, id_owner);
        next();
        break;

      case "follow":
        auth.check.logged(req);
        next();
        break;

      default:
        next();
    }
  }
  return midleware;
};
