const axios = require('axios');
const url = 'http://34.207.213.121:3000'
const checkToken = require('../common/middleware').checkToken;

exports.updateMilestone = async function(req, res) {
  const { authorization } = req.headers;
 checkToken(req, res, async result => {
   if(result.success) {
      const { data } = result;
      const { username } = data;
      const { milestone } = req.body;
      const stream = {
        "stream": "bb_data_stream",
        "key": username,
        "data": milestone
      }
      const response = await axios.post(`${url}/registerMilestone`, stream);

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
