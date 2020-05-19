const axios = require('axios');
//const url = 'http://34.207.213.121:3000'
const url = 'http://3.91.182.21:3000';
const milestoneUrl = 'http://3.91.182.21:3002';

const checkToken = require('../common/middleware').checkToken;

exports.updateMilestone = async function(req, res) {
 checkToken(req, res, async result => {
   if(result.success) {
      const { data } = result;
      const { username } = data;
      const { milestone } = req.body;
      const { index } = req.query;
     const mileStoneResponse = await axios.get(`${milestoneUrl}/queryMileStoneData?stream=bb_data_stream&key=${username}`);
     const mileStoneData = JSON.parse(mileStoneResponse.data.items);
     mileStoneData[index] = milestone;
     const milestoneStream = {
       "stream": "bb_data_stream",
       "key": username,
       "data": mileStoneData
     }
      const response = await axios.post(`${url}/registerMilestone`, milestoneStream);

      res.json(response.data);
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
