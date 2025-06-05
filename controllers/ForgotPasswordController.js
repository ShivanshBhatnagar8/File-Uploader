const { updatePassword } = require("../db/queries");
const { renderForm, validateUser } = require("../utils/helper");

async function getForgotPasswordForm(req, res) {
  try {
    renderForm("forgot-password", res, false, false, null);
  } catch (error) {
    res.status(400).render("errorPage");
  }
}

async function updateUserPassword(req, res) {
  try {
    const { username, password, confirmPassword } = req.body;
    const hashedPassword = await validateUser(
      username,
      password,
      confirmPassword,
      true,
      "forgot-password",
      res,
      (val1 = false),
      (val2 = false),
      null
    );
    if (hashedPassword) {
      const user = await updatePassword(hashedPassword, username);
      console.log(user);
      if (user !== null) {
        if (req.session.messages && req.session.messages.length !== 0) {
          req.session.messages = [];
        }
        res.redirect("/");
      } else {
        let error = [
          {
            msg: "Username does not exist",
          },
        ];
        renderForm("forgot-password", res, false, false, error);
      }
    }
  } catch (error) {
    res.status(400).render("errorPage");
  }
}

module.exports = {
  getForgotPasswordForm,
  updateUserPassword,
};
