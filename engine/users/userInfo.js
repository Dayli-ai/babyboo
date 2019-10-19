const axios = require('axios');
const url = 'http://34.207.213.121:3000'

exports.getUserInfo = async (req, res) => {

  const {stream, key} = req.query;
  const response = await axios.get(`${url}/queryDataByKey?stream=${stream}&key=${key}`);
  res.json(response.data);
}


