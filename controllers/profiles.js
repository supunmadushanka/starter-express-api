const Profile = require('../models/profile');

exports.getProfiles = async (req, res) => {
  const profiles = await Profile.find();
  res.status(200).json({ profiles });
};

exports.postProfile = async (req, res) => {
    const { date } = req.body;
  const { name } = req.body;
  const imagePath = 'https://black-pronghorn-robe.cyclic.app/images/' + req.file.filename; // Note: set path dynamically
  const profile = new Profile({
    name,
    imagePath,
    date,
  });
  const createdProfile = await profile.save();
  res.status(201).json({
    profile: {
      ...createdProfile._doc,
    },
  });
};
