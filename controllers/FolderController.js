const {
  createFolderByUser,
  getFolderByName,
  getFileByFolderId,
  deleteFolder,
  getFolderByUser,
} = require("../db/queries");

async function fetchFolderByName(folderName) {
  try {
    const folder = await getFolderByName(folderName);
    return folder;
  } catch (error) {
    res.status(400).render("errorPage");
  }
}
async function createFolder(req, res) {
  try {
    const { folderName } = req.body;
    const folder = await fetchFolderByName(folderName);
    const folders = await getFolderByUser(req.user);
    if (!folder) {
      await createFolderByUser(folderName, req.user);
      res.redirect("/");
    } else {
      return res.render("index", {
        user: req.user,
        message: req.session.messages,
        folders: folders,
        files: [],
        errorFolder: "Folder already exists",
        error: null,
      });
    }
  } catch (error) {
    res.status(400).render("errorPage");
  }
}

async function deletingFolder(req, res) {
  try {
    let folders = [];
    const { folderId } = req.body;
    if (req.user) {
      folders = await getFolderByUser(req.user);
    }
    const files = await getFileByFolderId(Number(folderId));

    if (files.length !== 0) {
      return res.status(400).json({
        errorFolder: "Cannot delete the folder as it contains files",
      });
    } else {
      await deleteFolder(Number(folderId));
      res.sendStatus(200);
    }
  } catch (error) {
    res.status(400).render("errorPage");
  }
}
module.exports = {
  createFolder,
  deletingFolder,
};
