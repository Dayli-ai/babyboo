const axios = require('axios');
const url = 'http://34.207.213.121:3000'

exports.createUser = async (req, res) => {

  const {key, data} = req.body;
  const userData = {
    "stream": "bb_stream",
    "key": key,
    "data":data
  };
  const response = await axios.post(`${url}/registerUser`, userData);
  console.log(response);
  res.json(response.data);
}


