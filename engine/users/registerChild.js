const axios = require('axios');
const checkToken = require('../common/middleware').checkToken;

const url = 'http://34.207.213.121:3000'

exports.createChild = async function(req, res) {
  const { authorization } = req.headers;
 checkToken(req, res, async result => {
   console.log(result);
   if(result.success) {
      const { data } = result;
      const { username } = data;
      const { gender, name, dob, relation } = req.body;
      const queryResponse = await axios.get(`${url}/queryDataByKey?stream=bb_stream&key=${username}`);
      const items = queryResponse.data.items;
      const userObject = JSON.parse(items[items.length-1].data);
      const key = queryResponse.data.items[0].key;
     const emptyVaccinesData = require('../data/vaccinesempty.json');
     const emptyVaccines = Object.assign({}, emptyVaccinesData);
     emptyVaccines.birth.dueDate = dob;
     const dobArray = dob.split("/");
     const [dd, mm, yyyy ] = dobArray;
     const dobConverted = `${yyyy}-${mm}-${dd}`;
     const sixWeeks = new Date(dobConverted).addDays(42);
     const sixWeeksDate = `${sixWeeks.getDate()}/${sixWeeks.getMonth()+1}/${sixWeeks.getFullYear()}`;
     emptyVaccines['6Weeks'].dueDate = sixWeeksDate;
     const tenWeeks = new Date(dobConverted).addDays(70);
     const tenWeeksDate = `${tenWeeks.getDate()}/${tenWeeks.getMonth()+1}/${tenWeeks.getFullYear()}`;
     emptyVaccines['10Weeks'].dueDate = tenWeeksDate;
     const fourteenWeeks = new Date(dobConverted).addDays(728);
     const fourteenWeeksDate = `${fourteenWeeks.getDate()}/${fourteenWeeks.getMonth()+1}/${fourteenWeeks.getFullYear()}`;
     emptyVaccines['14Weeks'].dueDate = fourteenWeeksDate;
     const sixMonths = new Date(dobConverted).addDays(182.5);
     const sixMonthsDate = `${sixMonths.getDate()}/${sixMonths.getMonth()+1}/${sixMonths.getFullYear()}`;
     emptyVaccines['6Months'].dueDate = sixMonthsDate;
     const nineMonths = new Date(dobConverted).addDays(273.75);
     const nineMonthsDate = `${sixMonths.getDate()}/${nineMonths.getMonth()+1}/${nineMonths.getFullYear()}`;
     emptyVaccines['9Months'].dueDate = nineMonthsDate;
     const twelveMonths = new Date(dobConverted).addDays(365);
     const twelveMonthsDate = `${sixMonths.getDate()}/${twelveMonths.getMonth()+1}/${twelveMonths.getFullYear()}`;
     emptyVaccines['12Months'].dueDate = twelveMonthsDate;
      const newUserObject = {...userObject, child: { gender, name, dob, relation }, childVaccines: emptyVaccines };
      const stream = {
        "stream": "bb_stream",
        "key": key,
        "data": newUserObject
      }
      const response = await axios.post(`${url}/registerUser`, stream);

      res.json(response.data);
   }else {
     res.json(result);
   }
 });

};

exports.index = async function(req, res) {
  res.json({
    success: true,
    message: 'Index page',
  });
};
