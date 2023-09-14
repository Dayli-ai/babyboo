const axios = require('axios');
const fs = require('fs');
const MS_ENGINE_URL = process.env.MS_ENGINE_URL
const checkToken = require('../common/middleware').checkToken;

exports.getMilestoneInfo = async (req, res) => {
  const { authorization } = req.headers;
  checkToken(req, res, async result => {
    if (result.success) {
      const { username } = result.data;
      const response = await axios.get(`${MS_ENGINE_URL}/queryMileStoneData?stream=bb_data_stream&key=${username}`);
      const items = response.data.items;
      res.json(JSON.parse(items));
    } else {
      res.status(403).json(result);
    }
  });

}


