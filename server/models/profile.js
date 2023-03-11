// const { model } = require('mongoose');
const mongoose = require('mongoose');

const basicInfoSchema = mongoose.Schema({
  fullname: String,
  jobTitle: String,
  showEmail: {
    type: Boolean,
    default: false,
  },
  careerObj: String,
  // pphoto: String,
  skillsData: [String],
});

const userAccInfoSchema = mongoose.Schema({
  githubLink: String,
  soLink: String,
  leetcodeLink: String,
});

const educationSchema = mongoose.Schema({
  eduLevel: String,
  instName: String,
  eduDescription: String,
});

const experienceSchema = mongoose.Schema({
  companyName: String,
  jobRole: String,
  jobDescription: String,
});

const projectSchema = mongoose.Schema({
  projectTitle: String,
  demovideo: String,
  projectDescription: String,
});

const profileSchema = mongoose.Schema({
  basicInfo: basicInfoSchema,
  userAccInfo: userAccInfoSchema,
  education: [educationSchema],
  experiences: [experienceSchema],
  projects: [projectSchema],
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
