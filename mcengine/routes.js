const express = require('express');
const router = express.Router();

router.get('/queryDataByKey', require('./data/query').fetchDataByKey);
router.post('/registerUser', require('./users/register').createUser);
router.post('/registerMilestone', require('./users/registerBigData').createBigUser);
router.post('/login', require('./users/login').login);
router.post('/fblogin', require('./users/fblogin').fblogin);
router.get('/', require('./common/middleware').checkToken, require('./users/login').index);

module.exports = router;


