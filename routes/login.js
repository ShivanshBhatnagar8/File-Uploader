const express = require("express");
const passport = require("passport");
const routes = express.Router();
const { getLoginForm, logout } = require("../controllers/LoginController");

routes.get("/", getLoginForm);
routes.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true,
  })
);
routes.get("/log-out", logout);

module.exports = routes;
