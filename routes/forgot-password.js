const express = require("express");
const routes = express.Router();
const {
  getForgotPasswordForm,
  updateUserPassword,
} = require("../controllers/ForgotPasswordController");

routes.get("/", getForgotPasswordForm);
routes.post("/", updateUserPassword);

module.exports = routes;
