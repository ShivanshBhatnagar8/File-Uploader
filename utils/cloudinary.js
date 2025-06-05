const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// async function uploadFileToCloudinary(file, res) {
//   try {
//     const result = cloudinary.uploader.upload(file.path, {
//       public_id: file.filename,
//     });
//     res.redirect("/");
//   } catch (error) {
//     console.log(error);
//     res.status(400).render("errorPage");
//   }
// }
module.exports = cloudinary;
