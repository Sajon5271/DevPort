const axios = require('axios');
const githubAccessCode = async (req, res, next) => {
  const { code } = req.body;
  const url = new URL('https://github.com/login/oauth/access_token');
  url.searchParams.append('client_id', process.env.GITHUB_CLIENT_ID);
  url.searchParams.append('client_secret', process.env.GITHUB_CLIENT_SECRET);
  url.searchParams.append('code', code);
  try {
    const access_token = await axios.post(
      url.toString(),
      {},
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );
    res.status(200);
    console.log(access_token.data);
    res.send({ access_token: access_token.data.access_token });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error: '500', message: 'Something went wrong' });
  }
};

module.exports = { githubAccessCode };
