const Profile = require('../models/profile');

async function getAllProfiles(req, res) {
  try {
    const profiles = await Profile.find();
    res.status(200);
    res.send(profiles);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error: '500', message: 'Something went wrong' });
  }
}

async function getSingleProfile(req, res) {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    res.status(200);
    res.send(profile);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error: '500', message: 'Something went wrong' });
  }
}

async function updateProfile(req, res) {
  try {
    const currentUserProfile = await Profile.findByIdAndUpdate(
      req.currentUser.profileId,
      req.body,
      { new: true }
    );
    res.status(201);
    res.send(currentUserProfile);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error: '500', message: 'Something went wrong' });
  }
}

module.exports = {
  getAllProfiles,
  updateProfile,
  getSingleProfile,
};
