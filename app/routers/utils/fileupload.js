const multer = require('multer');
const uploadDir = 'static/images/cars';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadSingle = multer({ storage: storage }).single('carphoto');

module.exports = { uploadSingle };
