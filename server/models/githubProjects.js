const mongoose = require('mongoose');

const projectsSchema = new mongoose.Schema({
  name: String,
  html_url: String,
  forks_count: Number,
  stargazers_count: Number,
  language: String,
  description: String,
  pushed_at: String,
});
const githubProjectSchema = new mongoose.Schema({
  profileId: {
    type: String,
    required: true,
  },
  githubProjects: {
    type: [projectsSchema],
  },
});

module.exports = mongoose.model('GithubProject', githubProjectSchema);
