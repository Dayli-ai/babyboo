const init = require('../common/init.js');
const jwt = require('jsonwebtoken');
let config = require('../common/config.js');

const multichain = init.getMultichain();

function hex_to_ascii(str) {
    var hex = str.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

exports.login = async function (req, res) {
    userstream="bb_stream"
    let username = req.body.username;
    let password = req.body.password;

    var fetch_pass = new Promise(function (resolve, reject) {
    multichain.listStreamKeyItems({stream: userstream, key: username, verbose: false}, (err, tx) => {
            resolve(tx)
   })
})
    await fetch_pass.then(function (value) {
     var password_act = hex_to_ascii(value[value.length].data);
     var par = JSON.parse(password_act); 
     var password_actual = par.password

    if (username && password) {
      if (username === username && password === password_actual) {
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
    })
}


exports.index = async function (req, res) {
        res.json({
      success: true,
      message: 'Index page'
    });
}
