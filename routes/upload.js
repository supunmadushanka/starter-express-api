const express = require('express');

const UploadController = require('../controllers/upload');

const storage = require('../helpers/videoThumbnail');

const router = express.Router();

router.get('/', UploadController.getUpload);

router.post('/', storage, UploadController.postUpload);




module.exports = router;
