const mongoose = require('mongoose');

const githubProjectSchema = new mongoose.Schema({
  profileId: {
    type: String,
    required: true,
  },
  githubProjects: {
    type: [projectsSchema],
  },
});

const projectsSchema = new mongoose.Schema({
  name: String,
  url: String,
  totalForks: Number,
  totalStars: Number,
  mainLanguage: String,
});

module.exports = mongoose.model('GithubProject', githubProjectSchema);
