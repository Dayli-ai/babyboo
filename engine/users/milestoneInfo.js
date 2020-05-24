const axios = require('axios');
const fs = require('fs');
//const url = 'http://34.207.213.121:3002';
const url = 'http://3.91.182.21:3002';
const checkToken = require('../common/middleware').checkToken;

exports.getMilestoneInfo = async (req, res) => {
  const { authorization } = req.headers;
  checkToken(req, res, async result => {
    if(result.success) {
      const {username} = result.data;
      const response = await axios.get(`${url}/queryMileStoneData?stream=bb_data_stream&key=${username}`);
      const items = response.data.items;
      res.json(JSON.parse(items));
    }else {
      res.status(403).json(result);
    }
  });

}


