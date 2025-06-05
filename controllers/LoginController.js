//const db = require("../db/queries");
const { getFolderByUser, getFilesByUser } = require("../db/queries");

async function fetchAllFolders(user) {
  try {
    if (user) {
      const folders = await getFolderByUser(user);
      return folders;
    }
  } catch (error) {
    return error;
  }
}
async function fetchAllFiles(user) {
  try {
    if (user) {
      const files = await getFilesByUser(user);
      return files;
    }
  } catch (error) {
    return error;
  }
}
async function getLoginForm(req, res) {
  try {
    const folders = await fetchAllFolders(req.user);
    const files = await fetchAllFiles(req.user);
    let error = null;
    res.render("index", {
      user: req.user,
      message: req.session.messages,
      folders: folders,
      files: files,
      errorFolder: null,
      error: error,
    });
  } catch (error) {
    res.status(400).render("errorPage");
  }
}

async function logout(req, res) {
  req.logout((err) => {
    if (err) {
      res.status(400).render("errorPage");
    }
    res.redirect("/");
  });
}

module.exports = {
  getLoginForm,
  logout,
};
