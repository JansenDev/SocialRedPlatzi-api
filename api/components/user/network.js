const express = require("express");

const router = express.Router();
const response = require("../../../network/response");
const controller = require("./index");
const security = require("../auth/security");

router.get("/", listar);
router.get("/:id", listarById);
router.post("/follow/:id", security("follow") ,follow);
router.post("/", insert);
router.put("/", security("update"), update);

function listar(req, res, next) {
  controller
    .list()
    .then((lista) => response.success(req, res, lista, 200))
    .catch(next);
}

function listarById(req, res, next) {
  const { id } = req.params;

  controller
    .get_data(id)
    .then((user) => response.success(req, res, user, 200))
    .catch(next);
}

function insert(req, res, next) {
  const data = req.body;
  controller
    .insert(data)
    .then((data) => response.success(req, res, data, 201))
    .catch(next);
}

// TODO: ADD UPDATE
function update(req, res, next) {
  controller
    .update(req.body)
    .then((data) => response.success(req, res, data, 200))
    .catch(next);

  // return response.success(req, res, req.body, 201);
}

function follow(req, res, next) {
  console.log(req);
  controller
    .follow(req.user.id, req.params.id)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
}

module.exports = router;
