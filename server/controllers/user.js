const Profile = require('../models/profile');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const secret = process.env.SECRET_KEY;

async function registerUser(req, res) {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(409)
        .send({ error: '409', message: 'User already exists' });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newProfile = await Profile.create({
        basicInfo: { email: req.body.email },
      });
      const newUser = await User.create({
        email: req.body.email,
        password: hashedPassword,
        profileId: newProfile._id,
      });
      const accessToken = jwt.sign({ _id: newUser._id }, secret, {
        expiresIn: '7d',
      });

      res.status(201);
      res.send({ accessToken, profileId: newUser.profileId });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error: '500', message: 'Something went wrong' });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(401)
      .send({ error: '401', message: 'Invalid Email or Password' });
    return;
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      const checkPass = await bcrypt.compare(password, user.password);
      if (checkPass) {
        const accessToken = jwt.sign({ _id: user._id }, secret, {
          expiresIn: '7d',
        });
        res.status(200);
        res.send({ accessToken, profileId: user.profileId });
      } else {
        res
          .status(401)
          .send({ error: '401', message: 'Incorrect credentials.' });
      }
    } else {
      res
        .status(403)
        .send({ error: '403', message: 'You are not registered yet' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: '500', message: 'Something went wrong' });
  }
}

async function oauthLogin(req, res, next) {
  try {
    const { access_token } = req.body;
    const user = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const userData = user.data;
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      const accessToken = jwt.sign({ _id: existingUser._id }, secret, {
        expiresIn: '7d',
      });
      res.status(200);
      res.send({ accessToken, profileId: existingUser.profileId });
    } else {
      const profile = await Profile.create({
        basicInfo: {
          email: userData.email,
          fullname: userData.name,
          pphoto: userData.avatar_url,
        },
        userAccInfo: {
          githubLink: userData.login,
        },
      });
      const newUser = await User.create({
        email: userData.email,
        profileId: profile._id,
      });
      const accessToken = jwt.sign({ _id: newUser._id }, secret, {
        expiresIn: '7d',
      });
      res.status(200);
      res.send({ accessToken, profileId: newUser.profileId });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: '500', message: 'Something went wrong' });
  }
}
module.exports = { registerUser, loginUser, oauthLogin };
