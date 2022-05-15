const express = require("express");
const router = express.Router();

const controller = require("./index");
const response = require("../../../network/response");




router.post("/login", login);

function login(req, res) {
  controller
    .login(req.body.username, req.body.password)
    .then((token) => response.success(req, res, token, 200))
    .catch((err) => response.error(req, res, err.message, 404));
}

module.exports = router;
