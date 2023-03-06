const express = require("express");
const router = express.Router();

const Upload = require("../models/VideoDetailsSchema");

const mongoose = require("mongoose");

var video06 = require("../models/videolink");
var video07 = require("../models/videoLink7");
var video08 = require("../models/videoLink8");
var video09 = require("../models/videoLink9");
var video10 = require("../models/videoLink10");
var video11 = require("../models/videoLink11");

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



router.get("/uploads", function (req, res) {
  console.log("Get request for all videos");
  Upload.find({}).exec(function (err, uploads) {
    if (err) {
      console.error("Error!" + err);
    } else {
      res.json(uploads);
    }
  });
});

router.delete("/uploads/:id", function (req, res) {
  console.log("delete request for videos");
  Upload.findByIdAndRemove(req.params.id, function (err, deletedVideo) {
    if (err) {
      res.send("Error!" + err);
    } else {
      res.json(deletedVideo);
    }
  });
});



router.get("/tasks", function (req, res) {
  console.log("Get request for all link");
  video06.find({}).exec(function (err, tasks) {
    if (err) {
      console.error("Error!" + err);
    } else {
      res.json(tasks);
    }
  });
});

router.get("/tasks07", function (req, res) {
  console.log("Get request for  grade 07");
  video07.find({}).exec(function (err, tasks07) {
    if (err) {
      console.error("Error!" + err);
    } else {
      res.json(tasks07);
    }
  });
});

router.get("/tasks8", function (req, res) {
  console.log("Get request for  grade 08");
  video08.find({}).exec(function (err, tasks8) {
    if (err) {
      console.error("Error!" + err);
    } else {
      res.json(tasks8);
    }
  });
});

router.get("/tasks9", function (req, res) {
  console.log("Get request for  grade 09");
  video09.find({}).exec(function (err, tasks9) {
    if (err) {
      console.error("Error!" + err);
    } else {
      res.json(tasks9);
    }
  });
});

router.get("/tasks10", function (req, res) {
  console.log("Get request for  grade 10");
  video10.find({}).exec(function (err, tasks10) {
    if (err) {
      console.error("Error!" + err);
    } else {
      res.json(tasks10);
    }
  });
});

router.get("/tasks11", function (req, res) {
  console.log("Get request for  grade 11");
  video11.find({}).exec(function (err, tasks11) {
    if (err) {
      console.error("Error!" + err);
    } else {
      res.json(tasks11);
    }
  });
});

router.delete("/tasks/:id", function (req, res) {
  console.log("delete request for videos");
  video06.findByIdAndRemove(req.params.id, function (err, deletedVideo) {
    if (err) {
      res.send("Error!" + err);
    } else {
      res.json(deletedVideo);
    }
  });
});
router.delete("/tasks7/:id", function (req, res) {
  console.log("delete request for videos");
  video07.findByIdAndRemove(req.params.id, function (err, deleteVideo7) {
    if (err) {
      res.send("Error!" + err);
    } else {
      res.json(deleteVideo7);
    }
  });
});

router.delete("/tasks8/:id", function (req, res) {
  console.log("delete request for videos");
  video08.findByIdAndRemove(req.params.id, function (err, deletedVideo8) {
    if (err) {
      res.send("Error!" + err);
    } else {
      res.json(deletedVideo8);
    }
  });
});
router.delete("/tasks9/:id", function (req, res) {
  console.log("delete request for videos");
  video09.findByIdAndRemove(req.params.id, function (err, deletedVideo9) {
    if (err) {
      res.send("Error!" + err);
    } else {
      res.json(deletedVideo9);
    }
  });
});

router.delete("/tasks10/:id", function (req, res) {
  console.log("delete request for videos");
  video10.findByIdAndRemove(req.params.id, function (err, deletedVideo10) {
    if (err) {
      res.send("Error!" + err);
    } else {
      res.json(deletedVideo10);
    }
  });
});

router.delete("/tasks11/:id", function (req, res) {
  console.log("delete request for videos");
  video11.findByIdAndRemove(req.params.id, function (err, deletedVideo11) {
    if (err) {
      res.send("Error!" + err);
    } else {
      res.json(deletedVideo11);
    }
  });
});

router.post("/uploadlink", (req, res) => {
  console.log(req.body);

  var uploadLink = req.body;
  var link = new video06(uploadLink);
  link.save((error, result) => {
    if (error) console.log("uploadLink", uploadLink);
    console.log("save link sucess");
    res.sendStatus(200);
  });
});

router.post("/uploadlink07", (req, res) => {
  console.log(req.body);

  var uploadLink07 = req.body;
  var link = new video07(uploadLink07);
  link.save((error, result) => {
    if (error) console.log("uploadLink07", uploadLink07);
    console.log("save link sucess");
    res.sendStatus(200);
  });
});
router.post("/uploadlink8", (req, res) => {
  console.log(req.body);

  var uploadLink8 = req.body;
  var link = new video08(uploadLink8);
  link.save((error, result) => {
    if (error) console.log("uploadLink8", uploadLink8);
    console.log("save link sucess");
    res.sendStatus(200);
  });
});
router.post("/uploadlink9", (req, res) => {
  console.log(req.body);

  var uploadLink9 = req.body;
  var link = new video09(uploadLink9);
  link.save((error, result) => {
    if (error) console.log("uploadLink9", uploadLink9);
    console.log("save link sucess");
    res.sendStatus(200);
  });
});
router.post("/uploadlink10", (req, res) => {
  console.log(req.body);

  var uploadLink10 = req.body;
  var link = new video10(uploadLink10);
  link.save((error, result) => {
    if (error) console.log("uploadLink10", uploadLink10);
    console.log("save link sucess");
    res.sendStatus(200);
  });
});
router.post("/uploadlink11", (req, res) => {
  console.log(req.body);

  var uploadLink11 = req.body;
  var link = new video11(uploadLink11);
  link.save((error, result) => {
    if (error) console.log("uploadLink11", uploadLink11);
    console.log("save link sucess");
    res.sendStatus(200);
  });
});



router.get('/video06/:videoname', function(req, res){
  console.log('Get a particular video')
  video06.find({videoname: req.params.videoname})
  .exec(function(err, video06){
    if(err){
      console.log('Error retrieving Particular video')
    } else {
      console.log('successfully retrieved particular video')
      res.json(video06)
    }
  })
})

router.get('/video07/:videoname', function(req, res){
  console.log('Get a particular video')
  video07.find({videoname: req.params.videoname})
  .exec(function(err, video07){
    if(err){
      console.log('Error retrieving Particular video')
    } else {
      console.log('successfully retrieved particular video')
      res.json(video07)
    }
  })
})
router.get('/video08/:videoname', function(req, res){
  console.log('Get a particular video')
  video08.find({videoname: req.params.videoname})
  .exec(function(err, video08){
    if(err){
      console.log('Error retrieving Particular video')
    } else {
      console.log('successfully retrieved particular video')
      res.json(video08)
    }
  })
})
router.get('/video09/:videoname', function(req, res){
  console.log('Get a particular video')
  video09.find({videoname: req.params.videoname})
  .exec(function(err, video09){
    if(err){
      console.log('Error retrieving Particular video')
    } else {
      console.log('successfully retrieved particular video')
      res.json(video09)
    }
  })
})
router.get('/video10/:videoname', function(req, res){
  console.log('Get a particular video')
  video10.find({videoname: req.params.videoname})
  .exec(function(err, video10){
    if(err){
      console.log('Error retrieving Particular video')
    } else {
      console.log('successfully retrieved particular video')
      res.json(video10)
    }
  })
})
router.get('/video11/:videoname', function(req, res){
  console.log('Get a particular video')
  video11.find({videoname: req.params.videoname})
  .exec(function(err, video11){
    if(err){
      console.log('Error retrieving Particular video')
    } else {
      console.log('successfully retrieved particular video')
      res.json(video11)
    }
  })
})


module.exports = router;
