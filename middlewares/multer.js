import multer from 'multer';
import path from 'path';

const storageProfile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/profile/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    cb(null, baseName + '-' + Date.now() + ext);
  },
});

const storageAttachments = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/attachments/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    cb(null, baseName + '-' + Date.now() + ext);
  },
});

const fileFilter = function (req, file, cb) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('File type not supported'), false);
  }
};

const singleAvatar = multer({
  storage: storageProfile,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
}).single('avatar');

const attachmentsMulter = multer({
  storage: storageAttachments,
  limits: { fileSize: 1024 * 1024 * 16 },
  // fileFilter: fileFilter,
}).array('files', 5);



export {
  singleAvatar,
  attachmentsMulter,
};