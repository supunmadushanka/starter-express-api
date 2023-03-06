const express = require('express');

const profilesController = require('../controllers/profileImage');

const storage = require('../helpers/profileImage');

const router = express.Router();

router.get('/', profilesController.getProfiles);

router.post('/', storage, profilesController.postProfile);

module.exports = router;










