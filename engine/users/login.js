const axios = require('axios');
const MC_ENGINE_URL = process.env.MC_ENGINE_URL

exports.login = async function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  const data = { username, password };
  let response;
  try {
    response = await axios.post(`${MC_ENGINE_URL}/login`, data);
    console.log(response);
    res.json(response.data);
  } catch (e) {
    res.status(403).json(e.response.data.message);
  }

};

exports.index = async function (req, res) {
  res.json({
    success: true,
    message: 'Index page',
  });
};
