//other imports and code will go here
const checkToken = require('../common/middleware').checkToken;

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
          fs.readFile(req.file.path,(err, contents)=> {
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
