//other imports and code will go here
const axios = require('axios');
const fs = require('fs');
const checkToken = require('../common/middleware').checkToken;
const url = 'http://34.207.213.121:3000';

exports.uploadImage = async function(req, res) {
  checkToken(req, res, async result => {
    if(result.success) {
      const { data } = result;
      const { username } = data;
      try {
        const stream = 'bb_stream';
        const qureyResponse = await axios.get(`${url}/queryDataByKey?stream=${stream}&key=${username}`);
        const items = qureyResponse.data.items;
        console.log('file', req.files)
        console.log('body', req.body);
        if (items.length > 0) { //if user found then change password
          fs.readFile(req.files[0].path,(err, contents)=> {
            if (err) {
              console.log('Error: ', err);
            } else {
              console.log('File contents ', contents);
            }
            res.json(response.data);
          });
        }else { //if user not found
          res.status(403).json('User not found');
        }

      }catch(e) {
        console.log('error in image upload', e);
        res.status(403).json(e);
      }
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
