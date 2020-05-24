const axios = require('axios');

const url = 'http://34.207.213.121:3000'
//const url = 'http://3.91.182.21:3000'

exports.login = async function(req, res) {
  let username = req.body.username;
  let password = req.body.password;

  const data = { username, password };
  let response;
  try {
    response = await axios.post(`${url}/login`, data);
    console.log(response);
    res.json(response.data);
  }catch(e) {
    res.status(403).json(e.response.data.message);
  }

};

exports.index = async function(req, res) {
  res.json({
    success: true,
    message: 'Index page',
  });
};
