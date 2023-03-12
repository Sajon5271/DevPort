const jwt = require('jsonwebtoken');
const User = require('../models/user');
const secret = process.env.SECRET_KEY;

const authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) {
    return res
      .status(403)
      .send({ error: '403', message: 'You are not authorized' });
  }

  const token = authHeaders.split(' ')[1];
  try {
    const { _id } = jwt.verify(token, secret);
    const user = await User.findOne({ _id });
    if (user) {
      req.currentUser = user;
      next();
    } else {
      return res
        .status(401)
        .send({ error: '401', message: 'Invalid JWT token' });
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).send({
        error: '401',
        message: 'Session expired, please log in again',
      });
    }
    console.log(error);
    res.status(500).send({ error: '500', message: 'Something went wrong' });
  }
};

module.exports = authMiddleware;
