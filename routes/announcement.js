const express = require('express');

const profilesController = require('../controllers/announcement');

const storage = require('../helpers/announcement');

const router = express.Router();

var profiles = require("../models/announcement");

router.get('/', profilesController.getProfiles);

router.post('/', storage, profilesController.postProfile);


router.delete("/announcement/:id", function (req, res) {
    console.log("delete request for announcement");
    profiles.findByIdAndRemove(req.params.id, function (err, deleteannouncement) {
      if (err) {
        res.send("Error!" + err);
      } else {
        res.json(deleteannouncement);
      }
    });
  });


module.exports = router;
