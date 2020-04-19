const init = require('../common/init');
var date = require('date-and-time');

const log4js = init.getLog();
const logger = log4js.getLogger('backend-logs');
const uilogger = log4js.getLogger('frontend-logs');

exports.fetchDataByKey = function (req, res) {
    console.log('txId ', req.query);
    try {
      const {stream, key} = req.query;
      const multichain = init.getMultichain();
      multichain.listStreamKeyItems({
        stream,
        key,
        verbose: true
      }, (err, data) => {
        //res.setHeader('Access-Control-Allow-Origin', '*');
        try{
          data.forEach(item => {
            item.data = Buffer.from(item.data, 'hex').toString('utf8')
          });
          logger.info("Fetch data from",stream,"for the key",key);
          res.json({items: data});
        }catch(e) {
          console.log('error in fetching data');
          res.json({items: []});
        }

      });
    }catch(e) {
        console.log('error in fetching query');
    }

}

exports.fetchMileStoneData = async function (req, res) {
        const {stream, key} = req.query;
        var new_address = new Promise(function (resolve, reject) {
        multichain.listStreamKeyItems({
            stream : stream,
            key : key,
            verbose : true,
            count : 1,
            start : -1,
        },(err,data) => {
                console.log('data', data);
//      console.log(data[0].data.txid)
        if (data.length > 0 && data[0].data.txid)
                {
                        console.log("big");
        console.log("databig", data);
                        resolve(data)
                }
        else {
        console.log("small data", data);
        data.forEach(item => {
            item.data = Buffer.from(item.data, 'hex').toString('utf8')
        });
        logger.info("Fetch data from",stream,"for the key",key);
        if(data.length> 0) res.json({items: data[0].data});
         else res.json({items: JSON.stringify("")});
        }
        //resolve(data)
})
})

 await new_address.then(function (value) {
        var txid = value[0].data.txid
        multichain.getTxOutData({
            txid: txid,
            vout: 0,
        },(err,data) => {
       data = Buffer.from(data,'hex').toString('utf8')
       logger.info("Fetch data from",stream,"for the key",key);

       res.json({items: data});
        })
    })
}

var key_arr = new Array();

exports.fetchStreamKeys = function (req, res) {
    console.log('txId ', req.query);
    const {stream} = req.query;

    const multichain = init.getMultichain();
    multichain.listStreamKeys({
            stream : stream,
            key : "*",
            verbose : true,
            count : 1000000,
            start : 1
    }, (err, data) => {
 key_arr = [];
 data.forEach(item=> {
        key_arr.push(item.key);
        });
       res.json({items: key_arr});
    });
}


