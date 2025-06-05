const express = require("express");
const routes = express.Router();
const { creatingFile, deletingFile } = require("../controllers/FileController");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const publicId = `${file.fieldname}-${uniqueSuffix}"`;
    return {
      public_id: publicId,
    };
  },
});
function fileFilter(req, file, cb) {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/doc" ||
    file.mimetype === "application/jpg" ||
    file.mimetype === "application/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only pdf, doc, png and jpg files can be uploaded"));
    cb(null, false);
  }
}
const upload = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// routes.get("/download/:filename", (req, res) => {
//   const filePath = path.join(process.env.FILE_PATH, req.params.filename);

//   console.log(filePath);
//   res.download(filePath, req.params.filename, (err) => {
//     if (err) {
//       res.status(400).render("errorPage");
//     }
//   });
// });

routes.post("/", upload.single("file"), creatingFile);
routes.delete("/delete", deletingFile);
module.exports = routes;
