const axios = require('axios');
const url = 'http://3.92.215.217:3000'
const checkToken = require('../common/middleware').checkToken;
const emptyVaccinesData = require('../data/vaccinesempty.json');
const milestone = require('../data/milestone.json');

exports.createChild = async function(req, res) {
  const { authorization } = req.headers;
 checkToken(req, res, async result => {
   if(result.success) {
      const { data } = result;
      const { username } = data;
      const { gender, name, dob, relation } = req.body;
      const queryResponse = await axios.get(`${url}/queryDataByKey?stream=bb_stream&key=${username}`);
      const items = queryResponse.data.items;
      const userObject = JSON.parse(items[items.length-1].data);
      const key = queryResponse.data.items[0].key;
     const emptyVaccines = Object.assign({}, emptyVaccinesData);
     emptyVaccines['At Birth'].dueDate = dob;
     const dobArray = dob.split("/");
     const [dd, mm, yyyy ] = dobArray;
     const dobConverted = `${yyyy}-${mm}-${dd}`;
     const sixWeeks = new Date(dobConverted).addDays(42);
     const sixWeeksDate = `${sixWeeks.getDate()}/${sixWeeks.getMonth()+1}/${sixWeeks.getFullYear()}`;
     emptyVaccines['6 Weeks'].dueDate = sixWeeksDate;
     const tenWeeks = new Date(dobConverted).addDays(70);
     const tenWeeksDate = `${tenWeeks.getDate()}/${tenWeeks.getMonth()+1}/${tenWeeks.getFullYear()}`;
     emptyVaccines['10 Weeks'].dueDate = tenWeeksDate;
     const fourteenWeeks = new Date(dobConverted).addDays(98);
     const fourteenWeeksDate = `${fourteenWeeks.getDate()}/${fourteenWeeks.getMonth()+1}/${fourteenWeeks.getFullYear()}`;
     emptyVaccines['14 Weeks'].dueDate = fourteenWeeksDate;
     const sixMonths = new Date(dobConverted).addDays(182.5);
     const sixMonthsDate = `${sixMonths.getDate()}/${sixMonths.getMonth()+1}/${sixMonths.getFullYear()}`;
     emptyVaccines['6 Months'].dueDate = sixMonthsDate;
     const nineMonths = new Date(dobConverted).addDays(273.75);
     const nineMonthsDate = `${sixMonths.getDate()}/${nineMonths.getMonth()+1}/${nineMonths.getFullYear()}`;
     emptyVaccines['9 Months'].dueDate = nineMonthsDate;
     const nineTo12Months = new Date(dobConverted).addDays(320);
     const nineTo12MonthsDate = `${nineTo12Months.getDate()}/${nineTo12Months.getMonth()+1}/${nineTo12Months.getFullYear()}`;
     emptyVaccines['9-12 Months'].dueDate = nineTo12MonthsDate;
     const twelveMonths = new Date(dobConverted).addDays(365);
     const twelveMonthsDate = `${sixMonths.getDate()}/${twelveMonths.getMonth()+1}/${twelveMonths.getFullYear()}`;
     emptyVaccines['12 Months'].dueDate = twelveMonthsDate;
     const fifteenMonths = new Date(dobConverted).addDays(456.25);
     const fifteenMonthsDate = `${fifteenMonths.getDate()}/${fifteenMonths.getMonth()+1}/${fifteenMonths.getFullYear()}`;
     emptyVaccines['15 Months'].dueDate = fifteenMonthsDate;
     const sixteenToMonths = new Date(dobConverted).addDays(510);
     const sixteenToMonthsDate = `${sixteenToMonths.getDate()}/${sixteenToMonths.getMonth()+1}/${sixteenToMonths.getFullYear()}`;
     emptyVaccines['16-18 Months'].dueDate = sixteenToMonthsDate;
     const eighteenMonths = new Date(dobConverted).addDays(547.501);
     const eighteenMonthsDate = `${eighteenMonths.getDate()}/${eighteenMonths.getMonth()+1}/${eighteenMonths.getFullYear()}`;
     emptyVaccines['18 Months'].dueDate = eighteenMonthsDate;
     const twoYears = new Date(dobConverted).addDays(730);
     const twoYearsDate = `${twoYears.getDate()}/${twoYears.getMonth()+1}/${twoYears.getFullYear()}`;
     emptyVaccines['2 Years'].dueDate = twoYearsDate;
     const fourToSixYears = new Date(dobConverted).addDays(1825);
     const fourToSixYearsDate = `${fourToSixYears.getDate()}/${fourToSixYears.getMonth()+1}/${fourToSixYears.getFullYear()}`;
     emptyVaccines['4-6 Years'].dueDate = fourToSixYearsDate;
     const tenToTwelveYears = new Date(dobConverted).addDays(4015);
     const tenToTwelveYearsDate = `${tenToTwelveYears.getDate()}/${tenToTwelveYears.getMonth()+1}/${tenToTwelveYears.getFullYear()}`;
     emptyVaccines['10-12 Years'].dueDate = tenToTwelveYearsDate;
     const child = { child: { gender, name, dob, relation }, childVaccines: emptyVaccines };
     const children = userObject.children ? [...userObject.children, child] : [child];
     const newUserObject = {...userObject, child: { gender, name, dob, relation }, childVaccines: emptyVaccines , children}; //remove child and childvaccines after the next release
     const stream = {
        "stream": "bb_stream",
        "key": key,
        "data": newUserObject
      }
      const milestoneStream = {
        "stream": "bb_data_stream",
        "key": key,
        "data": milestone
      }
      const response = await axios.post(`${url}/registerUser`, stream);
      await axios.post(`${url}/registerMilestone`, milestoneStream);

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
