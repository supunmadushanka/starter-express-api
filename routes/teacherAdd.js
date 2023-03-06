const express = require('express');

const profilesController = require('../controllers/teacherAdd');

const storage = require('../helpers/teacherAddImg');

const router = express.Router();

router.get('/', profilesController.getProfiles);

router.post('/', storage, profilesController.postProfile);

module.exports = router;