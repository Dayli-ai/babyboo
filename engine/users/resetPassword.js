const axios = require('axios');
const url = 'http://3.92.215.217:3000';
const checkToken = require('../common/middleware').checkToken;

exports.resetPassword = async function(req, res) {
  checkToken(req, res, async result => {
    if(result.success) {
      const { data } = result;
      const { username } = data;
      const { currentPassword, newPassword } = req.body;
      try {
        const stream = 'bb_stream';
        const qureyResponse = await axios.get(`${url}/queryDataByKey?stream=${stream}&key=${username}`);
        const items = qureyResponse.data.items;

        if (items.length > 0) { //if user found then change password
          const userObject = JSON.parse(items[items.length-1].data);
          const key = items[0].key;
          if(currentPassword !== userObject.password) return res.status(403).json(`CurrentPassword doesn't match`);
          const userData = {
            "stream": "bb_stream",
            "key": key,
            "data":{...userObject, password: newPassword}
          };
          const response = await axios.post(`${url}/registerUser`, userData);
          res.json(response.data);
        }else { //if user not found
          res.status(403).json('User not found');
        }

      }catch(e) {
        res.status(403).json(e);
      }
    }else {
      res.json(result);
    }

  });


};

exports.index = async function(req, res) {
  res.json({
    success: true,
    message: 'Index page',
  });
};
