const Profile = require('../models/announcement');

exports.getProfiles = async (req, res) => {
  const profiles = await Profile.find();
  res.status(200).json({ profiles });
};

exports.postProfile = async (req, res) => {
    const { des } = req.body;
  const { name } = req.body;
  const imagePath = 'http://localhost:3000/announcement/' + req.file.filename; // Note: set path dynamically
  const profile = new Profile({
    name,
    imagePath,
   des
  });
  const createdProfile = await profile.save();
  res.status(201).json({
    profile: {
      ...createdProfile._doc,
    },
  });
};


//  http://localhost:3000
