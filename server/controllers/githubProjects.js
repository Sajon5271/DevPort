const GithubProjects = require('../models/githubProjects');

const getUserProjects = async (req, res, next) => {
  const id = req.params.id;
  try {
    const userProjects = await GithubProjects.findOne({
      profileId: id,
    });
    res
      .status(200)
      .send(
        userProjects
          ? userProjects.githubProjects
          : { error: '500', message: 'Something went wrong' }
      );
  } catch (error) {
    console.log(error);
    res.status(500).send({ error, message: 'Something went wrong' });
  }
};
const updateUserProjects = async (req, res, next) => {
  const newData = req.body;
  try {
    let userProjects = await GithubProjects.findOneAndUpdate(
      {
        profileId: req.currentUser.profileId,
      },
      { $set: { githubProjects: newData } },
      { new: true }
    );
    if (!userProjects) {
      userProjects = await GithubProjects.create({
        profileId: req.currentUser.profileId,
        githubProjects: newData,
      });
    }
    res.status(201).send(userProjects);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error, message: 'Something went wrong' });
  }
};

module.exports = { getUserProjects, updateUserProjects };
