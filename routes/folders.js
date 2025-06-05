const express = require("express");
const routes = express.Router();
const {
  createFolder,
  deletingFolder,
} = require("../controllers/FolderController");

routes.post("/", createFolder);
routes.delete("/delete", deletingFolder);

module.exports = routes;
