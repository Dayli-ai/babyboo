const axios = require('axios');

const url = 'http://34.207.213.121:3000'

exports.fblogin = async function(req, res) {
  let username = req.body.username;

  const data = { username };
  let response;
  try {
    response = await axios.post(`${url}/fblogin`, data);
    console.log(response);
    res.json(response.data);
  }catch(e) {
    res.status(403).json(e.response.data);
  }

};

exports.index = async function(req, res) {
  res.json({
    success: true,
    message: 'Index page',
  });
};
