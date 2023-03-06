const Profile = require('../models/Admin');
const saltRounds = 10;
bcrypt = require("bcrypt"),
exports.getProfiles = async (req, res) => {
  const profiles = await Profile.find();
  res.status(200).json({ profiles });
};

exports.postProfile = async (req, res) => {
  const { title } = req.body;
  const { name } = req.body;
  const { lastName } = req.body;
  const { email } = req.body;
  const { mobileNumber } = req.body;
  const { password } = req.body;

  let user = await Profile.findOne({ email });
  if (user) return res.status(400).send("User already registered.");
  const imagePath = 'https://black-pronghorn-robe.cyclic.app/images/' + req.file.filename; // Note: set path dynamically
  const profile = new Profile({
    
    title,
    name,
  lastName,
  email,
  mobileNumber,
  password,
  imagePath,
  });
  const createdProfile = await profile.save();
  res.status(201).json({
    profile: {
      ...createdProfile._doc,
    },
  });
};
