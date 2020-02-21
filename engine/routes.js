'use strict';
const pushnotifications = require('./users/pushnotifications');

function setTimerForNotifications() {
  setInterval(() => {
    console.log('Triggering Notifications');
    pushnotifications.checkAndPushNotifications();
  }, 43200 * 1000);
}
pushnotifications.checkAndPushNotifications(); //Initial call
setTimerForNotifications();
const multer = require('multer');
//Define all the routes in the server running on multichain cluster
const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: Storage });
module.exports = function routes(app) {
  //GET routes
  app.get('/getUserInfo', require('./users/userInfo').getUserInfo);
  app.get(
    '/getMilestoneData',
    require('./users/milestoneInfo').getMilestoneInfo,
  );
  app.get(
    '/',
    require('./common/middleware').checkToken,
    require('./users/login').index,
  );

  //POST routes
  app.post('/registerUser', require('./users/register').createUser);
  app.post(
    '/updateMilestone',
    require('./users/updateMilestone').updateMilestone,
  );
  app.post('/login', require('./users/login').login);
  app.post('/fblogin', require('./users/fblogin').fblogin);
  app.post('/forgotPassword', require('./users/forgotPassword').forgotPassword);
  app.post('/resetPassword', require('./users/resetPassword').resetPassword);

  app.post('/registerChild', require('./users/registerChild').createChild);
  app.post(
    '/updateDeviceToken',
    require('./users/updateDeviceToken').updateDeviceToken,
  );
  app.post('/issueVaccine', require('./users/issueVaccine').issueVaccine);
  app.post(
    '/uploadImage',
    upload.array('photo', 3),
    require('./users/uploadImage').uploadImage,
  );
  app.post(
    '/uploadImg',
    upload.array('photo', 3),
    require('./users/uploadImg').uploadImage,
  );
};
