const path = require("path");
require("dotenv").config();
const profilesRoutes = require("./routes/profiles");
const bcrypt = require("bcrypt");
const profilesImageRoutes = require("./routes/profileImage");
const teacherAddImageRoutes = require("./routes/teacherAdd");
const user = require("./routes/userProfile");
const uploadRoutes = require("./routes/upload");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const paperRoutes = require("./routes/pastpapers");
const PORTS = process.env.PORT || 3000;
const api = require("./routes/api");
const video = require("./routes/video");
const app = express(); //instance of express
var Admin = require("./models/Admin");
var Paper = require("./models/grade06paper"); //paper
var mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const pastpaper = require("./routes/pastpapers");
const announcement = require("./routes/announcement");
const announcementRoutes = require("./routes/announcement");
const mcqRoutes = require("./routes/mcq.route");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //to handle json data
app.use(express.json());
const router = require("./routes/routes");
app.use(router);
app.use("/documents", express.static(path.join("documents")));
app.use("/api", api);
app.use("/video", video);
app.use("/papers", pastpaper);
app.use("/announcement", announcement);
app.use("/mcq", mcqRoutes);
app.use("/profiles", profilesRoutes);
app.use("/profileImage", profilesImageRoutes);
app.use("/teacherAdd", teacherAddImageRoutes);
app.use("/userimage", user);
app.get("/", function (req, res) {
  res.send("Server Works"); //checking statement
});

mongoose
  .connect(
    "mongodb+srv://supun:1234@cluster0.ebw5swm.mongodb.net/schoolMS?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORTS, console.log(`Server is running on port ${PORTS}`));
  })
  .catch((err) => console.log(`Could not connect to database server`, err));

  
app.use(bodyParser.json());
app.use(cors());
app.post("/paper", (req, res) => {
  console.log(req.body);
  var AdminData = req.body;
  var admin = new Paper(AdminData);
  admin.save((error, result) => {
    if (error) console.log("AdminData", AdminData);
    console.log("save paper sucess");
    res.sendStatus(200);
  });
});
/*
app.post("/register", (req, res) => {
  console.log(req.body);
  var AdminData = req.body;
  let user = Admin.findOne({ email });
  if (user) return res.status(400).send("User already registered.");
  var admin = new Admin(AdminData);
  admin.save((error, registeredAdmin) => {
    if (error) {
      console.log(error);
    } else {
      let payload = { subject: registeredAdmin._id };
      let AdminToken = jwt.sign(payload, "key");
      console.log("save data sucess");
      res.status(200).send({ AdminToken, Admin });
    }
  });
});
*/
router.get("/admindetails", function (req, res) {
  console.log("Get user Details");
  Admin.find({}).exec(function (err, admindetails) {
    if (err) {
      console.error("Error!" + err);
    } else {
      res.json(admindetails);
    }
  });
});

app.use("/announcement", express.static(path.join("announcementImages")));
app.use("/api/announcement", announcementRoutes);
app.use("/images", express.static(path.join("images")));
app.use("/api/profiles", profilesRoutes);
app.use("/images", express.static(path.join("profilepicture")));
app.use("/pastpapers", express.static(path.join("pastpapers")));
app.use("/api/pastpapers", paperRoutes);
app.use("/videos", express.static(path.join("videos")));
app.use("/api/upload", uploadRoutes);
/*
app.post("/login", (req, res) => {
  var AdminData = req.body;
  Admin.findOne({ email: AdminData.email }, (error, Admin) => {
    if (error) {
      console.log(error);
    } else if (!Admin) {
      res.status(401).send("Invalid email");
    } else if (Admin.password !== AdminData.password) {
      res.status(401).send("Invalid password");
    } else {
      let payload = { subject: Admin._id };
      let AdminToken = jwt.sign(payload, "key");
      res.status(200).json({ AdminToken, Admin });
    }
  });
});
*/
router.post("/login", (req, res) => {
 

  var AdminData = req.body;
  Admin.findOne({ email: AdminData.email }, (error, Admin) => {
    if (error) {
      console.log(error);
    } else if (!Admin) {
      res.status(401).send("Invalid email");
      
    } else {

      bcrypt.compare(AdminData.password, Admin.password, (error,result) => {
        if(error){
          console.log(error)
        } else if(!result){
          res.status(402).send("Invalid Password");
        }
        else if(result){
          let payload = { subject: Admin._id };
          let AdminToken = jwt.sign(payload, "secretKey");
          console.log("no Error password")
          res.status(200).json({ AdminToken, Admin });
        }
      })

    } 

  });
});
















app.post("/register", (req, res) => {
  let userData = req.body;
  Admin.findOne({ email: req.body.email }, (error, user) => {
    if (error) {
      console.log(error);
    } else if (!user) {
      let user = new Admin(userData);
      user.save(async (error, registeredAdmin) => {
        if (error) {
          console.log(error);
        } else {
         

          let payload = { subject: registeredAdmin._id };
          let AdminToken = jwt.sign(payload, "key");
         
          res.status(200).send({ AdminToken, Admin });
        }
      });
    } else {
      return res.status(401).send("Email Already Exists");
    }
  });
});

