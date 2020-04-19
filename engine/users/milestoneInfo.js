const axios = require('axios');
const fs = require('fs');
const url = 'http://3.92.215.217:3000';
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


