const jwt = require('jsonwebtoken');
    //let  config = require('./config.js');
    let config = require('../common/config.js');
    let middleware = require('../common/middleware.js');


exports.login = async function (req, res) {
    console.log(req)
	let username = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB
    let mockedUsername = 'admin';
    let mockedPassword = 'password';
    console.log(mockedUsername,mockedPassword)
    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        let token = jwt.sign({username: username},
          config.secret,
          { expiresIn: '24h' // expires in 24 hours
          }
        );
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token
        });
      } else {
        res.status(403).json({
          success: false,
          message: 'Incorrect username or password'
        });
      }
    }
     else {
     res.status(400).json({
     success: false,
     message: 'Authentication failed! Please check the request'
    });
    }
}


exports.index = async function (req, res) {
        res.json({
      success: true,
      message: 'Index page'
    });
}
