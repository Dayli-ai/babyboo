const express = require('express');
const router = express.Router();
const multer = require('multer');
const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage: Storage });

router.get('/getUserInfo', require('./users/userInfo').getUserInfo);
router.get(
  '/getMilestoneData',
  require('./users/milestoneInfo').getMilestoneInfo,
);
router.get(
  '/',
  require('./common/middleware').checkToken,
  require('./users/login').index,
);
router.get('/getRhymesData', require('./users/rhymes').getRhymesData);

//POST routes
router.post('/registerUser', require('./users/register').createUser);
router.post(
  '/updateMilestone',
  require('./users/updateMilestone').updateMilestone,
);
router.post('/login', require('./users/login').login);
router.post('/fblogin', require('./users/fblogin').fblogin);
router.post('/forgotPassword', require('./users/forgotPassword').forgotPassword);
router.post('/resetPassword', require('./users/resetPassword').resetPassword);

router.post('/registerChild', require('./users/registerChild').createChild);
router.post(
  '/updateDeviceToken',
  require('./users/updateDeviceToken').updateDeviceToken,
);
router.post('/issueVaccine', require('./users/issueVaccine').issueVaccine);
router.post(
  '/uploadImage',
  upload.array('photo', 3),
  require('./users/uploadImage').uploadImage,
);
router.post(
  '/uploadImg',
  upload.array('photo', 3),
  require('./users/uploadImg').uploadImage,
);

const pushnotifications = require('./users/pushnotifications');
function setTimerForNotifications() {
  pushnotifications.checkAndPushNotifications(); //Initial call
  setInterval(() => {
    console.log('Triggering Notifications');
    pushnotifications.checkAndPushNotifications();
  }, 43200 * 1000);
}

module.exports = { router, setTimerForNotifications }
