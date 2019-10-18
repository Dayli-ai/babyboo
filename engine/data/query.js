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
