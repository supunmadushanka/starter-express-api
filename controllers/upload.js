const Upload = require('../models/VideoDetailsSchema');

exports.getUpload = async (req, res) => {
  const upload = await Upload.find();
  res.status(200).json({ upload });
};

exports.postUpload = async (req, res) => {
  const { subjectname }=req.body
  const { name } = req.body;
  const { des } = req.body;

  const videoPath = 'http://localhost:3000/videos/' + req.file.filename;
  const { teachername} =req.body;
  const { insertgrade}=req.body
   // Note: set path dynamically
  const upload = new Upload({
    subjectname,
    name,
    des,
    videoPath,
    teachername,
    insertgrade
  });
  const createdProfile = await upload.save();
  res.status(201).json({
    upload: {
      ...createdProfile._doc,
    },
  });
};


