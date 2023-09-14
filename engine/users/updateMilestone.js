const axios = require('axios');
const MC_ENGINE_URL = process.env.MC_ENGINE_URL
const MS_ENGINE_URL = process.env.MS_ENGINE_URL
const checkToken = require('../common/middleware').checkToken;

exports.updateMilestone = async function (req, res) {
  checkToken(req, res, async result => {
    if (result.success) {
      const { data } = result;
      const { username } = data;
      const { milestone } = req.body;
      const { index } = req.query;
      const mileStoneResponse = await axios.get(`${MS_ENGINE_URL}/queryMileStoneData?stream=bb_data_stream&key=${username}`);
      const mileStoneData = JSON.parse(mileStoneResponse.data.items);
      mileStoneData[index] = milestone;
      const milestoneStream = {
        "stream": "bb_data_stream",
        "key": username,
        "data": mileStoneData
      }
      const response = await axios.post(`${MC_ENGINE_URL}/registerMilestone`, milestoneStream);

      res.json(response.data);
    } else {
      res.json(result);
    }
  });

};

exports.index = async function (req, res) {
  res.json({
    success: true,
    message: 'Index page',
  });
};
