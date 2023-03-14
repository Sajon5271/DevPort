// const { model } = require('mongoose');
const mongoose = require('mongoose');

const basicInfoSchema = new mongoose.Schema({
  fullname: String,
  jobTitle: String,
  email: String,
  showEmail: {
    type: Boolean,
    default: false,
  },
  careerObj: String,
  pphoto: String,
  skillsData: { type: [String], default: [] },
});

const userAccInfoSchema = new mongoose.Schema({
  githubLink: String,
  soLink: String,
  leetcodeLink: String,
  linkedInLink: String,
});

const educationSchema = new mongoose.Schema({
  eduLevel: String,
  instName: String,
  eduDescription: String,
});

const experienceSchema = new mongoose.Schema({
  companyName: String,
  jobRole: String,
  jobDescription: String,
});

const projectSchema = new mongoose.Schema({
  projectTitle: String,
  demovideo: String,
  projectDescription: String,
});

const profileSchema = new mongoose.Schema({
  basicInfo: basicInfoSchema,
  userAccInfo: userAccInfoSchema,
  education: [educationSchema],
  experiences: [experienceSchema],
  projects: [projectSchema],
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
