const { createUser } = require("../db/queries");
const { renderForm, validateUser } = require("../utils/helper");
const { validationResult } = require("express-validator");

async function getSignUpForm(req, res) {
  try {
    renderForm("sign-up-form", res, false, false, null);
  } catch (error) {
    res.status(400).render("errorPage");
  }
}

async function signUpUser(req, res) {
  try {
    const result = validationResult(req);

    if (result.isEmpty()) {
      const { firstName, lastName, password, email, confirmPassword } =
        req.body;
      const hashedPassword = await validateUser(
        email,
        password,
        confirmPassword,
        false,
        "sign-up-form",
        res,
        (val1 = false),
        (val2 = false),
        null
      );
      if (hashedPassword) {
        await createUser(firstName, lastName, email, hashedPassword);
        res.redirect("/");
      }
    } else {
      renderForm("sign-up-form", res, false, false, result.errors);
    }
  } catch (error) {
    res.status(400).render("errorPage");
  }
}

module.exports = {
  getSignUpForm,
  signUpUser,
};
