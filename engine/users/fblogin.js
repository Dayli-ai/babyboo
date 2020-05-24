const axios = require('axios');
//const url = 'http://3.91.182.21:3000';
const url = 'http://34.207.213.121:3000';
exports.fblogin = async function(req, res) {
  let username = req.body.username;

  const data = { username };
  let response;
  try {
    const stream = 'bb_stream';
    const qureyResponse = await axios.get(`${url}/queryDataByKey?stream=${stream}&key=${username}`);
    const items = qureyResponse.data.items;
    if (items.length > 0) { //if user found then direct login into app
      response = await axios.post(`${url}/fblogin`, data);
      console.log(response);
      res.json(response.data);
    }else { //if user not found then register user into babyapp with password dummy and login into app.
      data.password = 'dummy';
      const userData = {
        "stream": "bb_stream",
        "key": username,
        "data":data
      };
      await axios.post(`${url}/registerUser`, userData);
      const loginResponse = await axios.post(`${url}/fblogin`, data);
      res.json(loginResponse.data);
    }

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
