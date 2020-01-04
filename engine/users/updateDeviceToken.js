const axios = require('axios');
const checkToken = require('../common/middleware').checkToken;
const url = 'http://34.207.213.121:3000';

exports.updateDeviceToken = async function(req, res) {
  const { authorization } = req.headers;
  checkToken(req, res, async result => {
    if (result.success) {
      const { data } = result;
      const { username } = data;
      const { deviceToken } = req.body;
      const queryResponse = await axios.get(
        `${url}/queryDataByKey?stream=bb_stream&key=${username}`,
      );
      const items = queryResponse.data.items;
      const userObject = JSON.parse(items[items.length - 1].data);
      const key = queryResponse.data.items[0].key;
      const newUserObject = { ...userObject, deviceToken };
      const stream = {
        stream: 'bb_stream',
        key: key,
        data: newUserObject,
      };
      const response = await axios.post(`${url}/registerUser`, stream);
      res.json(response.data);
    } else {
      res.status(403).json(result);
    }
  });
};
