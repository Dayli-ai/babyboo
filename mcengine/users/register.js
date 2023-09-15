const init = require('../common/init');
const log4js = init.getLog();
const logger = log4js.getLogger('backend-logs');

exports.createUser = function (req, res) {
   const multichain = init.getMultichain();
   const stream_name = "bb_stream"
   const actor_address = "1RpWVNGh6gvfhDVkg38wvKbtWGBAkfffFWUuY2"
   const data = Buffer.from(JSON.stringify(req.body.data), 'utf8').toString('hex');
   const key = req.body.key;
   multichain.publishFrom({ from: actor_address, stream: stream_name, key: key, data: data }, (err, tx) => {
      uilogger.info("Registering into", stream_name, "with username", key, "and value", data);
      res.json({ transactionId: tx });
   })
}


