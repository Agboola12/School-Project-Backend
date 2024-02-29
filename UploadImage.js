const multer = require("multer");
const cloudinary = require("cloudinary").v2
const dotenv = require("dotenv");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

dotenv.config();
cloudinary.config({
  api_key: process.env.C_API_KEY,
    cloud_name: process.env.C_CLOUD_NAME,
    api_secret: process.env.C_API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary,
  params:{
    folder: "School",
    allowedFormats  : ["png", "jpeg", "jpg", "svg", "gif", "pdf", "txt", "docx", "doc"]
}
});
const upload = multer({storage});

module.exports ={upload, cloudinary}


