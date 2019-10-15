const init = require('../common/init');
var date = require('date-and-time');

var curr_date = date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')

const log4js = init.getLog();
const logger = log4js.getLogger('backend-logs');
const uilogger = log4js.getLogger('frontend-logs');

exports.createUser = function (req, res) {

    const multichain = init.getMultichain();
    var stream_name = "bb_stream"
    var actor_address="17obqLGzF5hu9wyQqCEDcCNkrfX86gtZUoaaHW"

function hex_to_ascii(str) {
   var hex = str.toString();
   var str = '';
   for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
     }
    return str;
}

const data = Buffer.from(JSON.stringify(req.body.data), 'utf8').toString('hex');
var key = req.body.key;

multichain.publishFrom({from:actor_address, stream:stream_name, key:key , data:data }, (err, tx) => {
uilogger.info("Registering",stream_name,"with key",key,"and value",data);
   res.json({transactionId: tx});
   })
}


