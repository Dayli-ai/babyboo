const init = require('../common/init');
const log4js = init.getLog();
const logger = log4js.getLogger('backend-logs');
const uilogger = log4js.getLogger('frontend-logs');

exports.fetchDataByKey = function (req, res) {
  console.log('txId ', req.query);
  try {
    const { stream, key } = req.query;
    const multichain = init.getMultichain();
    multichain.listStreamKeyItems({ stream: stream, key: key, verbose: false, count: 1, start: -1, }, (err, data) => {
      console.log("Fetch data from", stream, "for the key to login", key);
      if (data.length > 0 && data[0].data.txid) {
        var txid = data[0].data.txid
        console.log("Fetch data from", stream, "for the txid to login", txid);
        multichain.getTxOutData({
          txid: txid,
          vout: 0,
        }, (err, data) => {
          console.log("data", data)
          try {
            //data.forEach(item => {
            data = Buffer.from(data, 'hex').toString('utf8')
            const items = {
              "items": [
                {
                  "key": key,
                  "data": data,
                  "txid": txid
                }
              ]
            }
            console.log("Big data output data", items)
            //});
            logger.info("Fetch data from", stream, "for the key", key);
            res.json(items);
          } catch (e) {
            console.log('error in fetching data', e);
            res.json({ items: [] });
          }
        })
      }
      else {
        try {
          data.forEach(item => {
            item.data = Buffer.from(item.data, 'hex').toString('utf8')
          });
          logger.info("Fetch data from", stream, "for the key", key);
          res.json({ items: data });
        } catch (e) {
          console.log('error in fetching data');
          res.json({ items: [] });
        }
      }
    })
  }
  catch (e) {
    console.log('error in fetching data finally');
    res.json({ items: [] });
  }
}
