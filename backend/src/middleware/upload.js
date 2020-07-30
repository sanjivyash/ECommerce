const multer = require("multer");

const upload = multer({
  limit: { fileSize: 2000000 },
  fileFilter(req, files, cb) {
    const isValid = (file) => file.originalname.match(/\.(jpg|jpeg|png)$/);

    if (files.every(isValid)) {
      cb(undefined, true);
    } else {
      cb(
        new Error(
          "Please upload image type file in jpg, jpeg or png formats only"
        )
      );
    }
  },
});

module.exports = upload;
