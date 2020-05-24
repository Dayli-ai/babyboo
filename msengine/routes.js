'use strict'

//Define all the routes in the server running on multichain cluster
module.exports = function routes(app) {
    //GET routes
    app.get('/queryDataByKey', require('./data/query').fetchDataByKey);
    app.get('/queryMileStoneData', require('./data/query').fetchMileStoneData);
    app.get('/queryChildData', require('./data/query').fetchChildData);
    app.get('/queryStreamKeys', require('./data/query').fetchStreamKeys);

    //POST routes
    app.post('/registerUser', require('./users/register').createUser); 
    app.post('/updateUser', require('./users/register').updateUser);
    app.post('/login', require('./users/login').login);
    app.get('/',require('./common/middleware').checkToken, require('./users/login').index);

}


