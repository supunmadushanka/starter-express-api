const express = require('express');

const profilesController = require('../controllers/profiles');

const storage = require('../helpers/storage');

const router = express.Router();

var profiles = require("../models/profile");

router.get('/', profilesController.getProfiles);

router.post('/', storage, profilesController.postProfile);



router.delete("/profiles/:id", function (req, res) {
    console.log("delete request for ads");
    profiles.findByIdAndRemove(req.params.id, function (err, deleteAds) {
      if (err) {
        res.send("Error!" + err);
      } else {
        res.json(deleteAds);
      }
    });
  });

module.exports = router;
