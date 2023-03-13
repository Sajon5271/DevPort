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

async function getAllSkills(req, res) {
  try {
    const allSkillsArray = await Profile.aggregate()
      .match({})
      .unwind('basicInfo.skillsData')
      .group({
        _id: '$_id',
        skillsData: { $push: '$basicInfo.skillsData' },
      })
      .unwind('skillsData')
      .group({ _id: 'S', allSkills: { $push: '$skillsData' } });
    const skillList = allSkillsArray[0].allSkills;
    const counts = {};
    for (let i = 0; i < skillList.length; i++) {
      counts[skillList[i].toLowerCase().trim()] =
        1 + (counts[skillList[i].toLowerCase().trim()] || 0);
    }
    const countArray = [];
    for (const [key, value] of Object.entries(counts))
      countArray.push({ skill: key, count: value });
    countArray.sort((a, b) => b.count - a.count);
    res.send(countArray);
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
  getAllSkills,
};
