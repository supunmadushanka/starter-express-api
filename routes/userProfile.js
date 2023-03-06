const express = require('express');

const profilesController = require('../controllers/userProfile');

const storage = require('../helpers/userProfileimg');

const router = express.Router();

router.get('/', profilesController.getProfiles);

router.post('/', storage, profilesController.postProfile);

module.exports = router;










