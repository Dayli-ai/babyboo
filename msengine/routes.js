const express = require('express');
const router = express.Router();
//GET routes
router.get('/queryDataByKey', require('./data/query').fetchDataByKey);
router.get('/queryMileStoneData', require('./data/query').fetchMileStoneData);
router.get('/queryChildData', require('./data/query').fetchChildData);
router.get('/queryStreamKeys', require('./data/query').fetchStreamKeys);

//POST routes
router.post('/registerUser', require('./users/register').createUser);
router.post('/updateUser', require('./users/register').updateUser);
router.post('/login', require('./users/login').login);
router.get('/', require('./common/middleware').checkToken, require('./users/login').index);

module.exports = router;


