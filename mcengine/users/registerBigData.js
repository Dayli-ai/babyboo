const init = require('../common/init');
const log4js = init.getLog();
const logger = log4js.getLogger('backend-logs');

exports.createBigUser = function (req, res) {
   const multichain = init.getMultichain();
   const stream_name = "bb_data_stream"
   const actor_address = "1RpWVNGh6gvfhDVkg38wvKbtWGBAkfffFWUuY2"

   function hex_to_ascii(str) {
      var hex = str.toString();
      var str = '';
      for (var n = 0; n < hex.length; n += 2) {
         str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
      }
      return str;
   }

   const data = Buffer.from(JSON.stringify(req.body.data), 'utf8').toString('hex');
   multichain.publishFrom({ from: actor_address, stream: stream_name, key: req.body.key, data: data }, (err, tx) => {
      uilogger.info("Registering into", stream_name, "with username", req.body.key, "and value", data);
      res.json({ transactionId: tx });
   })
}


