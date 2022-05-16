const express = require("express");

const router = express.Router();
const response = require("../../../network/response");
const controller = require("./index");

router.get("/", listar);
router.get("/:id", findById);
router.post("/", insertPost);
router.put("/", updatePost);
router.delete("/:id", deletePost);

function listar(req, res, next) {
  controller
    .list()
    .then((lista) => response.success(req, res, lista, 200))
    .catch(next);
}

function findById(req, res, next) {
  const { id } = req.params;
  controller
    .listById(id)
    .then((data) => response.success(req, res, data, 200))
    .catch(next);
}

function insertPost(req, res, next) {
  const data = req.body;

  controller
    .insert(data)
    .then((result) => response.success(req, res, result, 200))
    .catch(next);
}

function updatePost(req, res, next) {
  const data = req.body;
  controller
    .update(data)
    .then((result) => response.success(req, res, result, 200))
    .catch(next);
}

function deletePost(req, res, next) {
  const { id } = req.params;
  controller
    .deleteById(id)
    .then((result) => response.success(req, res, result, 200))
    .catch(next);
}

module.exports = router;
