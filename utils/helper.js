const { use } = require("passport");
const { findUserByEmail } = require("../db/queries");
const bcrypt = require("bcryptjs");

function renderForm(formName, res, val1, val2, error) {
  return res.render(formName, {
    emailExists: val1,
    passWordMisMatch: val2,
    error: error,
  });
}

async function validateUser(
  email,
  password,
  confirmPassword,
  isUpdate,
  formName,
  res
) {
  try {
    const userByEmail = await findUserByEmail(email);
    if (password !== confirmPassword) {
      renderForm(formName, res, false, true, null);
    } else if (userByEmail !== null && !isUpdate) {
      renderForm(formName, res, true, false, null);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
    }
  } catch (error) {
    res.status(400).render("errorPage");
  }
}

module.exports = {
  renderForm,
  validateUser,
};
