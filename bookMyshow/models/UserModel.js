const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const upload = "/upload"
const userSchema = new mongoose.Schema({
    image: String,
    name: String,
    desc: String,
    lan: String,
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"..",upload))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-'+ Date.now())
    }
  })
userSchema.statics.imageUpload = upload;
userSchema.statics.multer = multer({ storage: storage }).single("image");
const UserModel = mongoose.model("parthuser",userSchema);
module.exports = UserModel;

