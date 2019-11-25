'use strict';
var multer  = require('multer');

//Define all the routes in the server running on multichain cluster
const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images')
  },
  filename(req, file, callback) {
    callback(null, 'image')
  },
})

const upload = multer({ storage: Storage })
module.exports = function routes(app) {
  //GET routes
  app.get('/getUserInfo', require('./users/userInfo').getUserInfo);
  app.get(
    '/',
    require('./common/middleware').checkToken,
    require('./users/login').index,
  );

  //POST routes
  app.post('/registerUser', require('./users/register').createUser);
  app.post('/login', require('./users/login').login);
  app.post('/fblogin', require('./users/fblogin').fblogin);
  app.post('/forgotPassword', require('./users/forgotPassword').forgotPassword);
  app.post('/resetPassword', require('./users/resetPassword').resetPassword);

  app.post('/registerChild', require('./users/registerChild').createChild);
  app.post('/issueVaccine', require('./users/issueVaccine').issueVaccine);
  app.post('/uploadImage', upload.array('photo', 3), require('./users/uploadImage').uploadImage);
};
