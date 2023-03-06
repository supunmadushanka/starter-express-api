const express = require("express");
const { findByIdAndUpdate } = require("../models/mcq.model");
const MCQSchema = require("../models/mcq.model");
const user = require("../models/user");
const UserMcq = require("../models/userMcq");
const router = express.Router();

//create questions


// router.post("/create", (req, res) => {
//   // create a question in database
//   const questionData = {
//     question: req.body.question,
//     answer: req.body.answer,
//   };
//   const createMcq = new MCQSchema(questionData);
//   if (!createMcq) {
//     res.status(204).json({ status: "Something went wrong!" });
//   }
//   MCQSchema.findOne({ question: req.body.question }, (err, results) => {
//     if (err) {
//       res.status(303).json({ message: "Mongo error response" });
//     } else if (results !== null) {
//       res.status(401).json({ message: "Already exists this question" });
//     } else {
//       createMcq.save().then((mcq) => {
//         res.status(201).json({ message: "Question created successfully" });
//       });
//     }
//   });
// });

// create a question
router.post("/create",async (req, res) => {
  
  try{
    var uploadgrade11 = req.body;
    var question = new MCQSchema(uploadgrade11);

    question.save(function(err, data) {
      if(err) {
        res.status(500).json(err.message);
      }
      else {
        res.status(200).json(data);
      }
  });

  }catch(err){
    res.status(500).json({
      message : err.message
    });
  }

});


// get 10 or less, not answered questions
router.get("/mcq/:id", async (req, res)=>{

  try{

    const grade = req.query.grade;
    const paperType = req.query.paperType;
    let availbeMcq = [];
    const id = req.params.id;
    const userMcq = await UserMcq.findOne({userId : id});
    const mcq = await MCQSchema.find({grade : grade, mcqType : paperType});

    mcq.forEach(item => {
      if(!userMcq.answeredMcq.includes(item._id)){
        availbeMcq.push(item);
      }
    });

    if(availbeMcq.length > 10){
      availbeMcq = availbeMcq.slice(0,10);
    }

    res.status(200).json(availbeMcq);
  }catch(err){
    console.log(err.message);
    res.status(500).json({
      message : err.message
    });
  }
});

//get all mcqs for a grade and paper type
router.get("/mcq", async (req, res)=>{
  try{
    const grade = req.query.grade;
    const paperType = req.query.paperType;
    const mcq = await MCQSchema.find({grade : grade, mcqType : paperType});
    res.status(200).json(mcq);
  }catch(err){
    console.log(err.message);
    res.status(500).json({
      message : err.message
    });
  }
});



//delete a question
router.delete("/:mcqId", (req, res) => {
  const deleteMcqId = req.params.mcqId;
  MCQSchema.findOneAndDelete({ _id: deleteMcqId }, {}, (err, deleteData) => {
    if (err) {
      res.status(422).json({
        message: "Mongo error response",
        data: deleteData,
      });
    }
    res.status(200).json({ message: "Delete successfully" });
  });
});

//update question
router.put("/:mcqId", (req, res) => {
  MCQSchema.findOne({ _id: req.params.mcqId }, {}, (mcqErr, updateData) => {
    if (mcqErr) {
      res.json({ error: mcqErr });
    } else if (!updateData) {
      res.status(422).json({ message: "Question not found" });
    }
    const updateMcqData = {
      question: req.body.question,
      answer: req.body.answer,
    };
    MCQSchema.findOneAndUpdate(
      { _id: req.params.mcqId },
      updateMcqData,
      {},
      (e, updatedData) => {
        if (e) {
          res.json(e);
        }
        res.status(200).json({ message: "Successfully updated" });
      }
    );
  });
});

//get all questions
router.get("/allmcq", (req, res) => {
  MCQSchema.find({}, { answer: 0, __v: 0, created_on: 0 }, (err, mcq) => {
    if (err) {
      res.status(422).json(err);
    }
    res.status(200).json(mcq);
  });
});


router.patch("/update-level", async(req,res)=>{
  try{
    const userId = req.body.userId;
    const marks = req.body.marks;
    const answeredQuestionIdList = req.body.questionIdList;

    const userMcq = await UserMcq.findOne({userId : userId});
    let student = await user.findOne({_id : userId});

    if(student.marks == null){
      student.marks = marks;
    }else{
      student.marks = marks + student.marks;
    }

    let level = Math.round(Math.sqrt(student.marks) / 2 );
    console.log(level);
    student.level = level;

    answeredQuestionIdList.forEach(item => {
      userMcq.answeredMcq.push(item);
    });

    await userMcq.save();
    let updatedStudent = await student.save();
    
    let responseBody = {
      message : "Updated successfully",
      data : updatedStudent
    }

    res.status(200).json(responseBody);

  }catch(err){
    res.status(500).json({
      message : err.message
    });
  }
});

// report a mcq

router.patch("/mcq-report",async (req,res)=>{
  try{
    let  mcqId = req.body.id;
    let selectedMcq = await MCQSchema.findById(mcqId);

    selectedMcq.reported = true;

    let updatedMcq = await selectedMcq.save();

    res.status(200).json(updatedMcq);

  }catch(ex){
    res.status(500).json({
      message : ex.message
    });
  }
});

// admin - view reported mcqs
router.get("/mcq-reported", async (req,res)=>{
  try{
    let reportedMcqList = await MCQSchema.find({reported : true});
    res.status(200).json(reportedMcqList);
  }catch(ex){
    res.status(500).json({
      message : ex.message
    });
  }
});

// admin - decline report
router.patch("/mcq-decline-reported", async (req,res)=>{
  try{
    let mcqId = req.body.id;
    let selectedMcq = await MCQSchema.findById(mcqId);

    selectedMcq.reported = false;

    let updatedMcq = await selectedMcq.save();

    res.status(200).json(updatedMcq);

  }catch(ex){
    res.status(500).json({
      message : ex.message
    });
  }
});

module.exports = router;

