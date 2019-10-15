'use strict'

//Define all the routes in the server running on multichain cluster
module.exports = function routes(app) {
    //GET routes
    app.post('/registerUser', require('./users/register').createUser);
    app.post('/login', require('./users/login').login);
    app.get('/',require('./common/middleware').checkToken, require('./users/login').index);

}


