const init = require('../common/init');
var date = require('date-and-time');

const log4js = init.getLog();
const logger = log4js.getLogger('backend-logs');
const uilogger = log4js.getLogger('frontend-logs');

exports.fetchDataByKey = function (req, res) {
  console.log('txId ', req.query);
  const {stream, key} = req.query;
  const multichain = init.getMultichain();
  multichain.listStreamKeyItems({
    stream,
    key,
    verbose: true
  }, (err, data) => {
    //res.setHeader('Access-Control-Allow-Origin', '*');
    data.forEach(item => {
      item.data = Buffer.from(item.data, 'hex').toString('utf8')
    });
    logger.info("Fetch data from",stream,"for the key",key);
    res.json({items: data});
  });
}

const multichain = init.getMultichain();
exports.fetchMileStoneData = async function (req, res) {
  const {stream, key} = req.query;
  const result = await  multichain.listStreamKeyItems({
    stream : stream,
    key : key,
    verbose : true,
    count : 1,
    start : -1,
  },(err,data) => {
    resolve(data)
  });
  console.log('result ', result);
  var new_address = new Promise(function (resolve, reject) {
    multichain.listStreamKeyItems({
      stream : stream,
      key : key,
      verbose : true,
      count : 1,
      start : -1,
    },(err,data) => {
      resolve(data)
    })
  })

  await new_address.then(function (value) {
    var txid = value[0].data.txid
    multichain.getTxOutData({
      txid: txid,
      vout: 0,
    },(err,data) => {
      data = Buffer.from(data,'hex').toString('utf8')
      res.json({items:data});
    })
  })
}
