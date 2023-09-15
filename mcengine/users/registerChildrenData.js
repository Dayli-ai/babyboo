const init = require('../common/init');
const log4js = init.getLog();
const logger = log4js.getLogger('backend-logs');

exports.createBigUser = function (req, res) {
   const multichain = init.getMultichain();
   const stream_name = "bb_child_data_stream"
   const actor_address = "1RpWVNGh6gvfhDVkg38wvKbtWGBAkfffFWUuY2"
   const data = Buffer.from(JSON.stringify(req.body.data), 'utf8').toString('hex');
   multichain.publishFrom({ from: actor_address, stream: stream_name, key: req.body.key, data: data }, (err, tx) => {
      uilogger.info("Registering into", stream_name, "with children", req.body.key, "and value", data);
      res.json({ transactionId: tx });
   })
}


