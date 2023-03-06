const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
var multer = require('multer');
const UserImage = require('../models/userimage');
const TeacherImage = require('../models/teacherImage');
const discussionReply = require("../models/discussionReply");
const bcrypt = require("bcrypt");
var randomstring = require("randomstring");

const Pastpaper = require("../models/pastpaper");
const Profile = require("../models/profile");
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');


const Teacher = require('../models/teacher');
const Message = require('../models/message');
const Discussion = require('../models/discussion');
const UserMcq = require("../models/userMcq");
const user = require("../models/user");

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

router.put('/user/:email/:phone', function (req, res) {
  console.log('Update and get User');

  const randomPw = randomstring.generate({
    length: 12,
    charset: 'alphabetic'
  });
  const hash = bcrypt.hashSync(randomPw,10)

  User.findOneAndUpdate({ email: req.params.email }, {
    $set: { password: hash }
  },
    {
      new: true,
    },
    function (err, updatedUser) {
      if (err) {
        res.send("Error updating user");
        console.log('REQ :' + randomPw)
      } else {

        var userDetailArray = JSON.stringify(updatedUser);

        var checkSome = JSON.parse(userDetailArray);
        var obj;

        for (var i = 0; i < checkSome.length; i++) {
          console.log(checkSome[i]['password']);
          obj = checkSome[i]['password'];
        }

        console.log(obj)


        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'kalawanananasala@gmail.com',
            pass: 'buildzone'
          }
        });

        var mailOptions = {
          from: 'kalawanananasala@gmail.com',
          to: `${req.body.email}`,
          subject: "This is Your Old Password For E-School-System. We recommend you to change it next time you log",
          text: `${randomPw}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            return res.status(401).send("Wrong Email or Phone Number");
          } else {
            console.log('Email sent: ' + info.response);
            console.log('Email sent to :' + req.body.email)
          }
        });
        res.json(updatedUser);
        console.log(updatedUser);
      }
    });
});



router.delete("/deleteads/:id", function (req, res) {
  console.log("delete request for teacher ads");
  Teacher.findByIdAndRemove(req.params.id, function (err, deleteads) {
    if (err) {
      res.send("Error!" + err);
    } else {
      res.json(deleteads);
    }
  });
});


function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  let token = req.headers.authorization.split(" ")[1];

  if (token === "null") {
    return res.status(401).send("Unauthorized request");
  }
  let payload = jwt.verify(token, "secretKey");
  if (!payload) {
    return res.status(401).send("Unauthorized request");
  }
  req.userId = payload.subject;
  next();
}

router.get("/", (req, res) => {
  res.send("From API route");
});

router.post("/register", (req, res) => {
  let userData = req.body;
  User.findOne({ email: req.body.email }, (error, user) => {
    if (error) {
      console.log(error)
    } else if (!user) {

      let user = new User(userData);
      const hash = bcrypt.hashSync(user.password,10)
      user.password = hash
      user.save(async (error, registeredUser) => {
        if (error) {
          console.log(error);
        } else {

          let userMcq = new UserMcq();
          userMcq.userId = user._id;
          await userMcq.save();

          let payload = { subject: registeredUser._id };
          let token = jwt.sign(payload, "secretKey");
          res.status(200).send({ token, user });
        }
      });

    } else {

      return res.status(401).send("Email Already Exists");
    }
  })





});

router.post("/login", (req, res) => {
  let userData = req.body;


  User.findOne({ email: userData.email }, (error, user) => {
    if (error) {
      console.log(error);
    } else if (!user) {
      res.status(401).send("Invalid email");
      
    } else {

      bcrypt.compare(userData.password, user.password, (error,result) => {
        if(error){
          console.log(error)
        } else if(!result){
          res.status(402).send("Invalid Password");
        }
        else if(result){
          let payload = { subject: user._id };
          let token = jwt.sign(payload, "secretKey");
          console.log("no Error password")
          res.status(200).json({ token, user });
        }
      })

    } 

  });
});



router.get("/userdetails", function (req, res) {
  console.log("Get user Details");
  User.find({}).exec(function (err, userdetails) {
    if (err) {
      console.error("Error!" + err);
    } else {
      res.json(userdetails);
    }
  });
});

router.get('/userImageList', function (req, res) {
  console.log('Get User Images List');
  UserImage.find({}).exec(function (err, userimages) {
    if (err) {
      console.log(err);
    } else {
      res.json(userimages);
    }
  })
});



router.get('/userImage/:email', function (req, res) {
  console.log('Get the image')
  UserImage.find({ email: req.params.email })
    .exec(function (err, theUser) {
      if (err) {
        console.log(err)
      } else {

        var userDetailArray = JSON.stringify(theUser);

        var checkSome = JSON.parse(userDetailArray);
        var obj;

        for (var i = 0; i < checkSome.length; i++) {
          console.log(checkSome[i]['imagePath']);
          obj = checkSome[i]['imagePath'];
        }

        res.json(obj);

      }
    })
});



router.put('/user/:id', function (req, res) {
  console.log('Update access validity of User');
  User.findByIdAndUpdate(req.params.id, {
    $set: { access: req.body.access }
  },
    {
      new: true,
    },
    function (err, updatedUser) {
      if (err) {
        res.send("Error updating user");
        console.log('REQ :' + req.body.access)
      } else {
        res.json(updatedUser);
        console.log(updatedUser)
      }
    });
});

router.put('/userExamDate/:id', function (req, res) {
  console.log('Update examDate validity of User');
  User.findByIdAndUpdate(req.params.id, {
    $set: { dateOfExam: req.body.dateOfExam }
  },
    {
      new: true,
    },
    function (err, updatedUser) {
      if (err) {
        res.send("Error updating user");
        console.log('REQ :' + req.body.dateOfExam)
      } else {
        res.json(updatedUser);
        console.log(updatedUser)
      }
    });
});



router.put('/userdetail/:id', function (req, res) {
  console.log('Update a User');

  const hash = bcrypt.hashSync(req.body.password,10)

  User.findByIdAndUpdate(req.params.id, {
    $set: {
      name: req.body.name, email: req.body.email, grade: req.body.grade, phone: req.body.phone, school: req.body.school,
      password: hash
    }
  },
    {
      new: true,
    },
    function (err, updatedUser) {
      if (err) {
        res.send("Error updating user");

      } else {
        res.json(updatedUser);
      }
    });
});

router.put('/userImageUpdate/:email', function (req, res) {
  console.log('Update image of User');
  User.findOneAndUpdate({ email: req.params.email }, {
    $set: { imagePath: req.body.imagePath }
  },
    {
      new: true,
    },
    function (err, updatedUser) {
      if (err) {
        res.send("Error updating user");
        console.log('REQ :' + req.body.imagePath)
      } else {
        res.json(updatedUser);
        console.log(updatedUser);
      }
    });
});

///////////////////////////////////////////////////////////////
router.get('/teacherImageList', function (req, res) {
  console.log('Get User Images List');
  TeacherImage.find({}).exec(function (err, teacherImages) {
    if (err) {
      console.log(err);
    } else {
      res.json(teacherImages);
    }
  })
});



router.get('/teacherImage/:email', function (req, res) {
  console.log('Get the image')
  TeacherImage.find({ email: req.params.email })
    .exec(function (err, theUser) {
      if (err) {
        console.log(err)
      } else {

        var userDetailArray = JSON.stringify(theUser);

        var checkSome = JSON.parse(userDetailArray);
        var obj;

        for (var i = 0; i < checkSome.length; i++) {
          console.log(checkSome[i]['imagePath']);
          obj = checkSome[i]['imagePath'];
        }

        res.json(obj);

      }
    })
});


router.put('/teacherImageUpdate/:email', function (req, res) {
  console.log('Update image of User');
  Teacher.findOneAndUpdate({ email: req.params.email }, {
    $set: { imagePath: req.body.imagePath }
  },
    {
      new: true,
    },
    function (err, updatedAd) {
      if (err) {
        res.send("Error updating ad");
        console.log('REQ :' + req.body.imagePath)
      } else {
        res.json(updatedAd);
        console.log(updatedAd);
      }
    });
});

///////////////////////////////////////////////////////////////



router.delete('/userdetails/:id', function (req, res) {
  console.log('Delete a user');
  User.findByIdAndRemove(req.params.id, function (err, deleteUser) {
    if (err) {
      res.send("Error deleting teacher");
    } else {
      res.json(deleteUser);
    }
  });
});


router.get('/teachers', function (req, res) {
  let TeacherData = req.body
  console.log('get request for teachers');
  Teacher.find({})
    .exec(function (err, teachers) {
      if (err) {
        console.log("Error retrieving teachers");
      } else {
        console.log('Succesfully retrieved')
        res.json(teachers);
      }
    });
});

router.get('/teachers/:area', function (req, res) {
  console.log('Get a particular teacher')
  Teacher.find({ area: req.params.area })
    .exec(function (err, teacher) {
      if (err) {
        console.log('Error retrieving Particular teacher')
      } else {
        console.log('successfully retrieved particular teacher')
        res.json(teacher)
      }
    })
})


router.get('/messages', function (req, res) {
  console.log('get request for messages');
  Message.find({})
    .exec(function (err, messages) {
      if (err) {
        console.log('Error retrieving messages');
      } else {
        console.log('Successfully retrieved messages')
        res.json(messages);
      }
    })
})



router.post('/message', function (req, res) {
  let messageData = req.body;
  let message = new Message(messageData);

  message.save((error, insertedMessage) => {
    if (error) {
      console.log(error)
    } else {
      return;
    }
  })
});


router.post('/teacher', function (req, res) {
  let teacherData = req.body;
  let teacher = new Teacher(teacherData);

  teacher.save((error, insertedTeacher) => {
    if (error) {
      console.log(error)
    } else {
      res.sendStatus(200)
    }
  })

});


router.delete("/deletemessage/:id", function (req, res) {
  console.log("delete request for message");
  Message.findByIdAndRemove(req.params.id, function (err, deletemessage) {
    if (err) {
      res.send("Error!" + err);
    } else {
      res.json(deletemessage);
    }
  });
});

router.get('/discussions', function (req, res) {
  console.log('get request for discussions');
  Discussion.find({})
    .exec(function (err, discussions) {
      if (err) {
        console.log('Error retrieving discussions');
      } else {
        console.log('Successfully retrieved discussions')
        res.json(discussions);
      }
    })

});

router.post('/discussion', function (req, res) {
  let discussionData = req.body;
  console.log(req.body)
  let discussion = new Discussion(discussionData);

  discussion.save((error, InsertedDiscussion) => {
    if (error) {
      console.log(error)
    } else {
      res.sendStatus(200)
    }
  })

});

router.delete("/discussion/:id", function (req, res) {
  console.log("delete request for ads");
  Discussion.findByIdAndRemove(req.params.id, function (err, deletePost) {
    if (err) {
      res.send("Error!" + err);
    } else {
      res.json(deletePost);
    }
  });
});

router.put('/teacher:id', function (req, res) {
  console.log('Update a Teacher');
  Teacher.findByIdAndUpdate(req.params.id,
    {
      $set: {
        name: req.body.name, subject: req.body.subject, area: req.body.area, grade: req.body.grade,
        email: req.body.email, Telephone: req.body.Telephone, description: req.body.description
      }
    },
    {
      new: true
    },
    function (err, updatedTeacher) {
      if (err) {
        res.send("Error updating teacher");
      } else {
        res.json(updatedTeacher);
      }
    });
});


router.delete('/teacher:id', function (req, res) {
  console.log('Delete a teacher');
  Teacher.findByIdAndRemove(req.params.id, function (err, deletedTeacher) {
    if (err) {
      res.send("Error deleting teacher");
    } else {
      res.json(deletedTeacher);
    }
  });
});



router.delete("/profiles/:id", function (req, res) {
  console.log("delete request for ads");
  Profile.findByIdAndRemove(req.params.id, function (err, deleteProfiles) {
    if (err) {
      res.send("Error!" + err);
    } else {
      res.json(deleteProfiles);
    }
  });
});

router.put("/profiles/:id", function (req, res) {
  console.log("approve for  update");
  Profile.findByIdAndUpdate(
    req.params.id,
    {
      $set: { name: req.body.name, imagepath: req.body.imagepath },
    },
    {
      new: true,
    },
    function (err, updateProfiles) {
      if (err) {
        res.send("Error!" + err);
      } else {
        res.json(updateProfiles);
      }
    }
  );
});


router.get("/pastpapers", function (req, res) {
  console.log("Get request for all pastpapers");
  Pastpaper.find({}).exec(function (err, pastpapers) {
    if (err) {
      console.error("Error!" + err);
    } else {
      res.json(pastpapers);
    }
  });
});

// reply route

router.patch('/discussions/reply',async (req,res)=>{

  try{
    let discussionId = req.body.id;
    let reply = new discussionReply(req.body.reply);


    let discussion = await Discussion.findById(discussionId);
    
    let discussionReplies = [];

    if(discussion.discussionReply != []){
      console.log("Inside : "+discussion.discussionReply)
      discussionReplies = discussion.discussionReply;
    }
    discussionReplies.push(reply);
    discussion.discussionReply = discussionReplies;

    let updatedDiscussion = await discussion.save();

    res.status(200).json(updatedDiscussion);

  }catch(ex){
    console.log(ex.message);
    res.status(500).json({
      message : ex.message
    })
  }
})

module.exports = router;
