const axios = require('axios');
const url = 'http://34.207.213.121:3000'
const checkToken = require('../common/middleware').checkToken;

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
     const nineTo12Months = new Date(dobConverted).addDays(320);
     const nineTo12MonthsDate = `${nineTo12Months.getDate()}/${nineTo12Months.getMonth()+1}/${nineTo12Months.getFullYear()}`;
     emptyVaccines['9-12Months'].dueDate = nineTo12MonthsDate;
     const twelveMonths = new Date(dobConverted).addDays(365);
     const twelveMonthsDate = `${sixMonths.getDate()}/${twelveMonths.getMonth()+1}/${twelveMonths.getFullYear()}`;
     emptyVaccines['12Months'].dueDate = twelveMonthsDate;
     const fifteenMonths = new Date(dobConverted).addDays(456.25);
     const fifteenMonthsDate = `${fifteenMonths.getDate()}/${fifteenMonths.getMonth()+1}/${fifteenMonths.getFullYear()}`;
     emptyVaccines['15Months'].dueDate = fifteenMonthsDate;
     const sixteenToMonths = new Date(dobConverted).addDays(510);
     const sixteenToMonthsDate = `${sixteenToMonths.getDate()}/${sixteenToMonths.getMonth()+1}/${sixteenToMonths.getFullYear()}`;
     emptyVaccines['16-18Months'].dueDate = sixteenToMonthsDate;
     const eighteenMonths = new Date(dobConverted).addDays(547.501);
     const eighteenMonthsDate = `${eighteenMonths.getDate()}/${eighteenMonths.getMonth()+1}/${eighteenMonths.getFullYear()}`;
     emptyVaccines['18Months'].dueDate = eighteenMonthsDate;
     const twoYears = new Date(dobConverted).addDays(730);
     const twoYearsDate = `${twoYears.getDate()}/${twoYears.getMonth()+1}/${twoYears.getFullYear()}`;
     emptyVaccines['2Years'].dueDate = twoYearsDate;
     const fourToSixYears = new Date(dobConverted).addDays(1825);
     const fourToSixYearsDate = `${fourToSixYears.getDate()}/${fourToSixYears.getMonth()+1}/${fourToSixYears.getFullYear()}`;
     emptyVaccines['4-6Years'].dueDate = fourToSixYearsDate;
     const tenToTwelveYears = new Date(dobConverted).addDays(4015);
     const tenToTwelveYearsDate = `${tenToTwelveYears.getDate()}/${tenToTwelveYears.getMonth()+1}/${tenToTwelveYears.getFullYear()}`;
     emptyVaccines['10-12Years'].dueDate = tenToTwelveYearsDate;
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
