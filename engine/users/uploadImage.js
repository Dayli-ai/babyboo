//other imports and code will go here
const axios = require('axios');
const fs = require('fs');
const checkToken = require('../common/middleware').checkToken;
const MC_ENGINE_URL = process.env.MC_ENGINE_URL
const moveFile = require('move-file');
// const mv = require('mv');

exports.uploadImage = async function (req, res) {
  checkToken(req, res, async result => {
    if (result.success) {
      const { data } = result;
      const { username } = data;
      try {
        const stream = 'bb_stream';
        const qureyResponse = await axios.get(`${MC_ENGINE_URL}/queryDataByKey?stream=${stream}&key=${username}`);
        const items = qureyResponse.data.items;
        console.log('file', req.files)
        console.log('body', req.body);
        const dir = `uploads/${username}`;
        if (items.length > 0) { //if user found then change password
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
          }

          await moveFile(req.files[0].path, `${dir}/photo.png`);
          console.log('The file has been moved');
          /*mv(req.files[0].path, `${username}/${req.files[0].path}`, function(err) {
            // done. it tried fs.rename first, and then falls back to
            // piping the source file to the dest file and then unlinking
            // the source file.
            res.json('Success');
          });*/
          /*fs.readFile(req.files[0].path,(err, contents)=> {
            if (err) {
              console.log('Error: ', err);
            } else {
              console.log('File contents ', contents);
            }

          });*/
          res.json('Success');
        } else { //if user not found
          res.status(403).json('User not found');
        }

      } catch (e) {
        console.log('error in image upload', e);
        res.status(403).json(e);
      }
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
