const init = require('../common/init');
var date = require('date-and-time');
var _ = require('underscore')

var curr_date = date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')

const log4js = init.getLog();
const logger = log4js.getLogger('backend-logs');
const uilogger = log4js.getLogger('frontend-logs');

function hex_to_ascii(str) {
   var hex = str.toString();
   var str = '';
   for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
     }
    return str;
}


exports.createUser = async function (req, res) {

    const multichain = init.getMultichain();
    var stream_name = "bb_stream"
    var actor_address="1RpWVNGh6gvfhDVkg38wvKbtWGBAkfffFWUuY2"

    var key = req.body.key;

    const data = Buffer.from(JSON.stringify(req.body.data), 'utf8').toString('hex');

	multichain.publishFrom({from:actor_address, stream:stream_name, key:key , data:data }, (err, tx) => {
	uilogger.info("Registering into",stream_name,"with username",key,"and value",data);
  	res.json({transactionId: tx});
   })
}

exports.updateUser = async function (req, res) {
var par;

    const multichain = init.getMultichain();
    var stream_name = "bb_stream"
    var actor_address="1RpWVNGh6gvfhDVkg38wvKbtWGBAkfffFWUuY2"

    var key = req.body.key;

    var fetch_pass = new Promise(function (resolve, reject) {
    multichain.listStreamKeyItems({stream: stream_name, key: key, verbose: true,count : 1,start : -1
     }, (err, tx) => {
             console.log("tx",tx)
            resolve(tx)
         })
    })
     await fetch_pass.then(function (value) {
     var password_act = hex_to_ascii(value[0].data);
     par = JSON.parse(password_act);
     console.log("existing",par)
     })
const data = Buffer.from(JSON.stringify(req.body.data), 'utf8').toString('hex');
var par1 = JSON.parse(hex_to_ascii(data));
console.log("adding",par1)
var target = _.extend(par, par1);
console.log("new data wull be",target)

multichain.publishFrom({from:actor_address, stream:stream_name, key:key , data:Buffer.from(JSON.stringify(target), 'utf8').toString('hex') }, (err, tx) => {
uilogger.info("Registering into",stream_name,"with username",key,"and value",data);
  res.json({transactionId: tx});
   })
 }
