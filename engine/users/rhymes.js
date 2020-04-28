
const rhymesData = require('../data/rhymes.json');
const checkToken = require('../common/middleware').checkToken;



exports.getRhymesData = async (req, res) => {

       
         checkToken(req, res, async result => {
         if(result.success) {
             
                  res.json(rhymesData);
              }
          
          else{
              res.status(403).json(result);
          }
       });
}


 