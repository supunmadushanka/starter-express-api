const express = require('express');

const PastpaperController = require('../controllers/pastpapers');

const storage = require('../helpers/pastpaperstorage');

const router = express.Router();

router.get('/', PastpaperController.getPastpaper);

router.post('/', storage, PastpaperController.postPastpaper);








const Paper = require("../models/pastpaper");

const mongoose = require("mongoose");

var video06 = require("../models/grade06paper");
var video07 = require("../models/grade07paper");
var video08 = require("../models/grade08paper");
var video09 = require("../models/grade09paper");
var video10 = require("../models/grade10paper");
var video11 = require("../models/grade11paper");

const db =
  "mongodb+srv://supun:1234@cluster0.ebw5swm.mongodb.net/schoolMS?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect(db, (err) => {
  if (err) {
    console.error("Error!" + err);
  } else {
    console.log("Connected to mongodb");
  }
});

router.delete("/papersdelete/:id", function (req, res) {
  console.log("delete request for papers");
  Paper.findByIdAndRemove(req.params.id, function (err, deletePaper) {
    if (err) {
      res.send("Error!" + err);
    } else {
      res.json(deletePaper);
    }
  });
});



router.get("/grade06", function (req, res) {
  console.log("Get request for all link");
  video06.find({}).exec(function (err, grade06) {
    if (err) {
      console.error("Error!" + err);
    } else {
      res.json(grade06);
    }
  });
});

router.get("/grade07", function (req, res) {
  console.log("Get request for  grade 07");
  video07.find({}).exec(function (err, grade07) {
    if (err) {
      console.error("Error!" + err);
    } else {
      res.json(grade07);
    }
  });
});

router.get("/grade08", function (req, res) {
  console.log("Get request for  grade 08");
  video08.find({}).exec(function (err, grade08) {
    if (err) {
      console.error("Error!" + err);
    } else {
      res.json(grade08);
    }
  });
});

router.get("/grade09", function (req, res) {
  console.log("Get request for  grade 09");
  video09.find({}).exec(function (err, grade09) {
    if (err) {
      console.error("Error!" + err);
    } else {
      res.json(grade09);
    }
  });
});

router.get("/grade10", function (req, res) {
  console.log("Get request for  grade 10");
  video10.find({}).exec(function (err, grade10) {
    if (err) {
      console.error("Error!" + err);
    } else {
      res.json(grade10);
    }
  });
});

router.get("/grade11", function (req, res) {
  console.log("Get request for  grade 11");
  video11.find({}).exec(function (err, grade11) {
    if (err) {
      console.error("Error!" + err);
    } else {
      res.json(grade11);
    }
  });
});

router.delete("/grade06/:id", function (req, res) {
  console.log("delete request for videos");
  video06.findByIdAndRemove(req.params.id, function (err, deletedVideo) {
    if (err) {
      res.send("Error!" + err);
    } else {
      res.json(deletedVideo);
    }
  });
});
router.delete("/grade07/:id", function (req, res) {
  console.log("delete request for videos");
  video07.findByIdAndRemove(req.params.id, function (err, deleteVideo7) {
    if (err) {
      res.send("Error!" + err);
    } else {
      res.json(deleteVideo7);
    }
  });
});

router.delete("/grade08/:id", function (req, res) {
  console.log("delete request for videos");
  video08.findByIdAndRemove(req.params.id, function (err, deletedVideo8) {
    if (err) {
      res.send("Error!" + err);
    } else {
      res.json(deletedVideo8);
    }
  });
});
router.delete("/grade09/:id", function (req, res) {
  console.log("delete request for videos");
  video09.findByIdAndRemove(req.params.id, function (err, deletedVideo9) {
    if (err) {
      res.send("Error!" + err);
    } else {
      res.json(deletedVideo9);
    }
  });
});

router.delete("/grade10/:id", function (req, res) {
  console.log("delete request for videos");
  video10.findByIdAndRemove(req.params.id, function (err, deletedVideo10) {
    if (err) {
      res.send("Error!" + err);
    } else {
      res.json(deletedVideo10);
    }
  });
});

router.delete("/grade11/:id", function (req, res) {
  console.log("delete request for videos");
  video11.findByIdAndRemove(req.params.id, function (err, deletedVideo11) {
    if (err) {
      res.send("Error!" + err);
    } else {
      res.json(deletedVideo11);
    }
  });
});

router.post("/uploadgrade06", (req, res) => {
  console.log(req.body);

  var uploadgrade06 = req.body;
  var link = new video06(uploadgrade06);
  link.save((error, result) => {
    if (error) console.log("uploadgrade06", uploadgrade06);
    console.log("save link sucess");
    res.sendStatus(200);
  });
});

router.post("/uploadgrade07", (req, res) => {
  console.log(req.body);

  var uploadgrade07 = req.body;
  var link = new video07(uploadgrade07);
  link.save((error, result) => {
    if (error) console.log("uploadgrade07", uploadgrade07);
    console.log("save link sucess");
    res.sendStatus(200);
  });
});
router.post("/uploadgrade08", (req, res) => {
  console.log(req.body);

  var uploadgrade08 = req.body;
  var link = new video08(uploadgrade08);
  link.save((error, result) => {
    if (error) console.log("uploadgrade08", uploadgrade08);
    console.log("save link sucess");
    res.sendStatus(200);
  });
});
router.post("/uploadgrade09", (req, res) => {
  console.log(req.body);

  var uploadgrade09 = req.body;
  var link = new video09(uploadgrade09);
  link.save((error, result) => {
    if (error) console.log("uploadgrade09", uploadgrade09);
    console.log("save link sucess");
    res.sendStatus(200);
  });
});
router.post("/uploadgrade10", (req, res) => {
  console.log(req.body);

  var uploadgrade10 = req.body;
  var link = new video10(uploadgrade10);
  link.save((error, result) => {
    if (error) console.log("uploadgrade10", uploadgrade10);
    console.log("save link sucess");
    res.sendStatus(200);
  });
});
router.post("/uploadgrade11", (req, res) => {
  console.log(req.body);

  var uploadgrade11 = req.body;
  var link = new video11(uploadgrade11);
  link.save((error, result) => {
    if (error) console.log("uploadgrade11", uploadgrade11);
    console.log("save link sucess");
    res.sendStatus(200);
  });
});

router.get('/papers/:name', function(req, res){
  console.log('Get a particular paper')
  video06.find({name: req.params.name})
  .exec(function(err, papers){
    if(err){
      console.log('Error retrieving Particular paper')
    } else {
      console.log('successfully retrieved particular paper')
      res.json(papers)
    }
  })
})

router.get('/papers07/:name', function(req, res){
  console.log('Get a particular paper')
  video07.find({name: req.params.name})
  .exec(function(err, papers){
    if(err){
      console.log('Error retrieving Particular paper')
    } else {
      console.log('successfully retrieved particular paper')
      res.json(papers)
    }
  })
})
router.get('/papers08/:name', function(req, res){
  console.log('Get a particular teacher')
  video08.find({name: req.params.name})
  .exec(function(err, papers){
    if(err){
      console.log('Error retrieving Particular paper')
    } else {
      console.log('successfully retrieved particular paper')
      res.json(papers)
    }
  })
})
router.get('/papers09/:name', function(req, res){
  console.log('Get a particular paper')
  video09.find({name: req.params.name})
  .exec(function(err, papers){
    if(err){
      console.log('Error retrieving Particular paper')
    } else {
      console.log('successfully retrieved particular paper')
      res.json(papers)
    }
  })
})
router.get('/papers10/:name', function(req, res){
  console.log('Get a particular paper')
  video10.find({name: req.params.name})
  .exec(function(err, papers){
    if(err){
      console.log('Error retrieving Particular paper')
    } else {
      console.log('successfully retrieved particular paper')
      res.json(papers)
    }
  })
})
router.get('/papers11/:name', function(req, res){
  console.log('Get a particular paper')
  video11.find({name: req.params.name})
  .exec(function(err, papers){
    if(err){
      console.log('Error retrieving Particular paper')
    } else {
      console.log('successfully retrieved particular paper')
      res.json(papers)
    }
  })
})







module.exports = router;
