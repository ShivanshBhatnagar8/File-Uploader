const express = require("express");
const routes = express.Router();
const {
  getSignUpForm,
  signUpUser,
} = require("../controllers/SignUpController");
const { checkSchema } = require("express-validator");
const validationSchema = require("../utils/validations");

routes.get("/", getSignUpForm);
routes.post("/", checkSchema(validationSchema), signUpUser);

module.exports = routes;
