const { createFile, deleteFile } = require("../db/queries");
//const { uploadFileToCloudinary } = require("../utils/cloudinary");

async function creatingFile(req, res) {
  try {
    const { folders } = req.body;
    if (req.file) {
      await createFile(req.file, req.user, Number(folders));
      res.redirect("/");
    }
  } catch (error) {
    res.status(400).render("errorPage");
  }
}

async function deletingFile(req, res) {
  try {
    const { fileId } = req.body;
    await deleteFile(fileId);
    res.sendStatus(200);
  } catch (error) {
    res.status(400).render("errorPage");
  }
}
module.exports = {
  creatingFile,
  deletingFile,
};
