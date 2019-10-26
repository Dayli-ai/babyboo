const axios = require('axios');
const url = 'http://34.207.213.121:3000'
const checkToken = require('../common/middleware').checkToken;

exports.getUserInfo = async (req, res) => {
  const { authorization } = req.headers;
  checkToken(req, res, async result => {
    if(result.success) {
      const {stream, key} = req.query;
      const response = await axios.get(`${url}/queryDataByKey?stream=${stream}&key=${key}`);
      const items = response.data.items;
      let data = {}
      if (items.length > 0) {
        data = JSON.parse(items[items.length -1].data);
      }
      res.json(data);
    }else {
      res.json(result);
    }
  });

}


