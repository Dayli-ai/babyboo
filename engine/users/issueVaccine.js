const axios = require('axios');
const checkToken = require('../common/middleware').checkToken;
const createPDF = require('../pdfcomponent/createTable');
//const url = 'http://34.207.213.121:3000';
const url = 'http://3.91.182.21:3000';

exports.issueVaccine = async function(req, res) {
  const { authorization } = req.headers;
  checkToken(req, res, async result => {
    console.log(result);
    if (result.success) {
      const { data } = result;
      const { username } = data;
      const { childVaccine } = req.body;
      const { index } = req.query;
      const queryResponse = await axios.get(
        `${url}/queryDataByKey?stream=bb_stream&key=${username}`,
      );
      const items = queryResponse.data.items;
      const userObject = JSON.parse(items[items.length - 1].data);
      const key = queryResponse.data.items[0].key;
      const children = userObject.children;
      const childVaccines = children[index].childVaccines;
      const objectKey = Object.keys(childVaccine)[0];
      let childVaccineObj = childVaccine[objectKey];
      childVaccineObj = { ...childVaccines[objectKey], ...childVaccineObj,};
      childVaccines[objectKey] = childVaccineObj;

      children[index].childVaccines = childVaccines;
      const newUserObject = { ...userObject, children };
      const stream = {
        stream: 'bb_stream',
        key: key,
        data: newUserObject,
      };
      const response = await axios.post(`${url}/registerUser`, stream);
      createPDF(childVaccines, children[index].child, username, index);

      res.json(response.data);
    } else {
      res.status(403).json(result);
    }
  });
};

exports.index = async function(req, res) {
  res.json({
    success: true,
    message: 'Index page',
  });
};
