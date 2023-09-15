const fs = require('fs');
const pdf = require('html-pdf');

// JSON data
//const data = require('./vaccinesempty.json');
// Build paths
const { buildPathHtml } = require('./buildPaths');

/**
 * @description Generates an `html` table with all the table rows
 * @param {String} rows
 * @returns {String}
 */
const createTable = rows => {
  return `
  <table style="width:100%">
  <tr>
    <th>Age</th>
    <th>Vaccine</th>
    <th>Due Date</th>
    <th>Given Date</th>
     <th>Height</th>
    <th>Weight</th>
    <th>Brand Name</th>
    <th>Mfg Date</th>
    <th>Exp Date</th>
    <th>Batch no</th>
    <th>Hospital</th>
  </tr>
  <tr>
    <td rowspan="3">At Birth</td>
    <td>BCG</td>
    <td>${rows['At Birth'].dueDate}</td>
    <td>${rows['At Birth'].vaccines[0].givenDate}</td>
    <td>${rows['At Birth'].height}</td>
    <td>${rows['At Birth'].weight}</td>
    <td>${rows['At Birth'].vaccines[0].brand}</td>
    <td>${rows['At Birth'].vaccines[0].mfgDate}</td>
    <td>${rows['At Birth'].vaccines[0].expDate}</td>
    <td>${rows['At Birth'].vaccines[0].batchNumber}</td>
    <td>${rows['At Birth'].vaccines[0].hospital}</td>
  </tr>
  <tr>
    <td>OPV 0</td>
    <td>${rows['At Birth'].dueDate}</td>
    <td>${rows['At Birth'].vaccines[1].givenDate}</td>
    <td>${rows['At Birth'].height}</td>
    <td>${rows['At Birth'].weight}</td>
    <td>${rows['At Birth'].vaccines[1].brand}</td>
    <td>${rows['At Birth'].vaccines[1].mfgDate}</td>
    <td>${rows['At Birth'].vaccines[1].expDate}</td>
    <td>${rows['At Birth'].vaccines[1].batchNumber}</td>
    <td>${rows['At Birth'].vaccines[1].hospital}</td>
  </tr>
  <tr>
    <td>HEP-B1</td>
    <td>${rows['At Birth'].dueDate}</td>
    <td>${rows['At Birth'].vaccines[2].givenDate}</td>
    <td>${rows['At Birth'].height}</td>
    <td>${rows['At Birth'].weight}</td>
    <td>${rows['At Birth'].vaccines[2].brand}</td>
    <td>${rows['At Birth'].vaccines[2].mfgDate}</td>
    <td>${rows['At Birth'].vaccines[2].expDate}</td>
    <td>${rows['At Birth'].vaccines[2].batchNumber}</td>
    <td>${rows['At Birth'].vaccines[2].hospital}</td>
  </tr>
  
  <tr>
    <td rowspan="6">6 Weeks</td>
    <td>DTwP 1</td>
    <td>${rows['6 Weeks'].dueDate}</td>
    <td>${rows['6 Weeks'].vaccines[0].givenDate}</td>
    <td>${rows['6 Weeks'].height}</td>
    <td>${rows['6 Weeks'].weight}</td>
    <td>${rows['6 Weeks'].vaccines[0].brand}</td>
    <td>${rows['6 Weeks'].vaccines[0].mfgDate}</td>
    <td>${rows['6 Weeks'].vaccines[0].expDate}</td>
    <td>${rows['6 Weeks'].vaccines[0].batchNumber}</td>
    <td>${rows['6 Weeks'].vaccines[0].hospital}</td>
  </tr>
  <tr>
    <td>IPV 1</td>
    <td>${rows['6 Weeks'].dueDate}</td>
    <td>${rows['6 Weeks'].vaccines[1].givenDate}</td>
    <td>${rows['6 Weeks'].height}</td>
    <td>${rows['6 Weeks'].weight}</td>
    <td>${rows['6 Weeks'].vaccines[1].brand}</td>
    <td>${rows['6 Weeks'].vaccines[1].mfgDate}</td>
    <td>${rows['6 Weeks'].vaccines[1].expDate}</td>
    <td>${rows['6 Weeks'].vaccines[1].batchNumber}</td>
    <td>${rows['6 Weeks'].vaccines[1].hospital}</td>
  </tr>
  <tr>
    <td>HEP-B2</td>
    <td>${rows['6 Weeks'].dueDate}</td>
    <td>${rows['6 Weeks'].vaccines[2].givenDate}</td>
    <td>${rows['6 Weeks'].height}</td>
    <td>${rows['6 Weeks'].weight}</td>
    <td>${rows['6 Weeks'].vaccines[2].brand}</td>
    <td>${rows['6 Weeks'].vaccines[2].mfgDate}</td>
    <td>${rows['6 Weeks'].vaccines[2].expDate}</td>
    <td>${rows['6 Weeks'].vaccines[2].batchNumber}</td>
    <td>${rows['6 Weeks'].vaccines[2].hospital}</td>
  </tr>
  <tr>
    <td>Hib 1</td>
    <td>${rows['6 Weeks'].dueDate}</td>
    <td>${rows['6 Weeks'].vaccines[3].givenDate}</td>
    <td>${rows['6 Weeks'].height}</td>
    <td>${rows['6 Weeks'].weight}</td>
    <td>${rows['6 Weeks'].vaccines[3].brand}</td>
    <td>${rows['6 Weeks'].vaccines[3].mfgDate}</td>
    <td>${rows['6 Weeks'].vaccines[3].expDate}</td>
    <td>${rows['6 Weeks'].vaccines[3].batchNumber}</td>
    <td>${rows['6 Weeks'].vaccines[3].hospital}</td>
  </tr>
  <tr>
    <td>RV Vaccine 1</td>
    <td>${rows['6 Weeks'].dueDate}</td>
    <td>${rows['6 Weeks'].vaccines[4].givenDate}</td>
    <td>${rows['6 Weeks'].height}</td>
    <td>${rows['6 Weeks'].weight}</td>
    <td>${rows['6 Weeks'].vaccines[4].brand}</td>
    <td>${rows['6 Weeks'].vaccines[4].mfgDate}</td>
    <td>${rows['6 Weeks'].vaccines[4].expDate}</td>
    <td>${rows['6 Weeks'].vaccines[4].batchNumber}</td>
    <td>${rows['6 Weeks'].vaccines[4].hospital}</td>
  <tr>
    <td>PVC 1</td>
    <td>${rows['6 Weeks'].dueDate}</td>
    <td>${rows['6 Weeks'].vaccines[5].givenDate}</td>
    <td>${rows['6 Weeks'].height}</td>
    <td>${rows['6 Weeks'].weight}</td>
    <td>${rows['6 Weeks'].vaccines[5].brand}</td>
    <td>${rows['6 Weeks'].vaccines[5].mfgDate}</td>
    <td>${rows['6 Weeks'].vaccines[5].expDate}</td>
    <td>${rows['6 Weeks'].vaccines[5].batchNumber}</td>
    <td>${rows['6 Weeks'].vaccines[5].hospital}</td>
  </tr>
  
  <tr>
    <td rowspan="5">10 Weeks</td>
    <td>DTwP 2</td>
    <td>${rows['10 Weeks'].dueDate}</td>
    <td>${rows['10 Weeks'].vaccines[0].givenDate}</td>
    <td>${rows['10 Weeks'].height}</td>
    <td>${rows['10 Weeks'].weight}</td>
    <td>${rows['10 Weeks'].vaccines[0].brand}</td>
    <td>${rows['10 Weeks'].vaccines[0].mfgDate}</td>
    <td>${rows['10 Weeks'].vaccines[0].expDate}</td>
    <td>${rows['10 Weeks'].vaccines[0].batchNumber}</td>
    <td>${rows['10 Weeks'].vaccines[0].hospital}</td>
  </tr>
  <tr>
    <td>IPV 2</td>
    <td>${rows['10 Weeks'].dueDate}</td>
    <td>${rows['10 Weeks'].vaccines[1].givenDate}</td>
    <td>${rows['10 Weeks'].height}</td>
    <td>${rows['10 Weeks'].weight}</td>
    <td>${rows['10 Weeks'].vaccines[1].brand}</td>
    <td>${rows['10 Weeks'].vaccines[1].mfgDate}</td>
    <td>${rows['10 Weeks'].vaccines[1].expDate}</td>
    <td>${rows['10 Weeks'].vaccines[1].batchNumber}</td>
    <td>${rows['10 Weeks'].vaccines[1].hospital}</td>
  </tr>
  <tr>
    <td>Hib 2</td>
    <td>${rows['10 Weeks'].dueDate}</td>
    <td>${rows['10 Weeks'].vaccines[2].givenDate}</td>
    <td>${rows['10 Weeks'].height}</td>
    <td>${rows['10 Weeks'].weight}</td>
    <td>${rows['10 Weeks'].vaccines[2].brand}</td>
    <td>${rows['10 Weeks'].vaccines[2].mfgDate}</td>
    <td>${rows['10 Weeks'].vaccines[2].expDate}</td>
    <td>${rows['10 Weeks'].vaccines[2].batchNumber}</td>
    <td>${rows['10 Weeks'].vaccines[2].hospital}</td>
  </tr>
  <tr>
    <td>RV Vaccine 2</td>
    <td>${rows['10 Weeks'].dueDate}</td>
    <td>${rows['10 Weeks'].vaccines[3].givenDate}</td>
    <td>${rows['10 Weeks'].height}</td>
    <td>${rows['10 Weeks'].weight}</td>
    <td>${rows['10 Weeks'].vaccines[3].brand}</td>
    <td>${rows['10 Weeks'].vaccines[3].mfgDate}</td>
    <td>${rows['10 Weeks'].vaccines[3].expDate}</td>
    <td>${rows['10 Weeks'].vaccines[3].batchNumber}</td>
    <td>${rows['10 Weeks'].vaccines[3].hospital}</td>
  </tr>
  <tr>
    <td>PVC 2</td>
    <td>${rows['10 Weeks'].dueDate}</td>
    <td>${rows['10 Weeks'].vaccines[4].givenDate}</td>
    <td>${rows['10 Weeks'].height}</td>
    <td>${rows['10 Weeks'].weight}</td>
    <td>${rows['10 Weeks'].vaccines[4].brand}</td>
    <td>${rows['10 Weeks'].vaccines[4].mfgDate}</td>
    <td>${rows['10 Weeks'].vaccines[4].expDate}</td>
    <td>${rows['10 Weeks'].vaccines[4].batchNumber}</td>
    <td>${rows['10 Weeks'].vaccines[4].hospital}</td>
  </tr>
  
  <tr>
    <td rowspan="5">14 Weeks</td>
    <td>DTwP 3</td>
    <td>${rows['14 Weeks'].dueDate}</td>
    <td>${rows['14 Weeks'].vaccines[0].givenDate}</td>
    <td>${rows['14 Weeks'].height}</td>
    <td>${rows['14 Weeks'].weight}</td>
    <td>${rows['14 Weeks'].vaccines[0].brand}</td>
    <td>${rows['14 Weeks'].vaccines[0].mfgDate}</td>
    <td>${rows['14 Weeks'].vaccines[0].expDate}</td>
    <td>${rows['14 Weeks'].vaccines[0].batchNumber}</td>
    <td>${rows['14 Weeks'].vaccines[0].hospital}</td>
  </tr>
  <tr>
    <td>IPV 3</td>
    <td>${rows['14 Weeks'].dueDate}</td>
    <td>${rows['14 Weeks'].vaccines[1].givenDate}</td>
    <td>${rows['14 Weeks'].height}</td>
    <td>${rows['14 Weeks'].weight}</td>
    <td>${rows['14 Weeks'].vaccines[1].brand}</td>
    <td>${rows['14 Weeks'].vaccines[1].mfgDate}</td>
    <td>${rows['14 Weeks'].vaccines[1].expDate}</td>
    <td>${rows['14 Weeks'].vaccines[1].batchNumber}</td>
    <td>${rows['14 Weeks'].vaccines[1].hospital}</td>
  </tr>
  <tr>
    <td>Hib 3</td>
    <td>${rows['14 Weeks'].dueDate}</td>
    <td>${rows['14 Weeks'].vaccines[2].givenDate}</td>
    <td>${rows['14 Weeks'].height}</td>
    <td>${rows['14 Weeks'].weight}</td>
    <td>${rows['14 Weeks'].vaccines[2].brand}</td>
    <td>${rows['14 Weeks'].vaccines[2].mfgDate}</td>
    <td>${rows['14 Weeks'].vaccines[2].expDate}</td>
    <td>${rows['14 Weeks'].vaccines[2].batchNumber}</td>
    <td>${rows['14 Weeks'].vaccines[2].hospital}</td>
  </tr>
  <tr>
    <td>RV Vaccine 3</td>
    <td>${rows['14 Weeks'].dueDate}</td>
    <td>${rows['14 Weeks'].vaccines[3].givenDate}</td>
    <td>${rows['14 Weeks'].height}</td>
    <td>${rows['14 Weeks'].weight}</td>
    <td>${rows['14 Weeks'].vaccines[3].brand}</td>
    <td>${rows['14 Weeks'].vaccines[3].mfgDate}</td>
    <td>${rows['14 Weeks'].vaccines[3].expDate}</td>
    <td>${rows['14 Weeks'].vaccines[3].batchNumber}</td>
    <td>${rows['14 Weeks'].vaccines[3].hospital}</td>
  </tr>
  <tr>
    <td>PVC 3</td>
    <td>${rows['14 Weeks'].dueDate}</td>
    <td>${rows['14 Weeks'].vaccines[4].givenDate}</td>
    <td>${rows['14 Weeks'].height}</td>
    <td>${rows['14 Weeks'].weight}</td>
    <td>${rows['14 Weeks'].vaccines[4].brand}</td>
    <td>${rows['14 Weeks'].vaccines[4].mfgDate}</td>
    <td>${rows['14 Weeks'].vaccines[4].expDate}</td>
    <td>${rows['14 Weeks'].vaccines[4].batchNumber}</td>
    <td>${rows['14 Weeks'].vaccines[4].hospital}</td>
  </tr>
  
  <tr>
    <td rowspan="2">6 Months</td>
    <td>HEP-B3</td>
    <td>${rows['6 Months'].dueDate}</td>
    <td>${rows['6 Months'].vaccines[0].givenDate}</td>
    <td>${rows['6 Months'].height}</td>
    <td>${rows['6 Months'].weight}</td>
    <td>${rows['6 Months'].vaccines[0].brand}</td>
    <td>${rows['6 Months'].vaccines[0].mfgDate}</td>
    <td>${rows['6 Months'].vaccines[0].expDate}</td>
    <td>${rows['6 Months'].vaccines[0].batchNumber}</td>
    <td>${rows['6 Months'].vaccines[0].hospital}</td>
  </tr>
  <tr>
    <td>OPV 1</td>
    <td>${rows['6 Months'].dueDate}</td>
    <td>${rows['6 Months'].vaccines[1].givenDate}</td>
    <td>${rows['6 Months'].height}</td>
    <td>${rows['6 Months'].weight}</td>
    <td>${rows['6 Months'].vaccines[1].brand}</td>
    <td>${rows['6 Months'].vaccines[1].mfgDate}</td>
    <td>${rows['6 Months'].vaccines[1].expDate}</td>
    <td>${rows['6 Months'].vaccines[1].batchNumber}</td>
    <td>${rows['6 Months'].vaccines[1].hospital}</td>
  </tr>
  
   <tr>
    <td rowspan="2">9 Months</td>
    <td>MMR-1</td>
    <td>${rows['9 Months'].dueDate}</td>
    <td>${rows['9 Months'].vaccines[0].givenDate}</td>
    <td>${rows['9 Months'].height}</td>
    <td>${rows['9 Months'].weight}</td>
    <td>${rows['9 Months'].vaccines[0].brand}</td>
    <td>${rows['9 Months'].vaccines[0].mfgDate}</td>
    <td>${rows['9 Months'].vaccines[0].expDate}</td>
    <td>${rows['9 Months'].vaccines[0].batchNumber}</td>
    <td>${rows['9 Months'].vaccines[0].hospital}</td>
  </tr>
  <tr>
    <td>OPV 2</td>
    <td>${rows['9 Months'].dueDate}</td>
    <td>${rows['9 Months'].vaccines[1].givenDate}</td>
    <td>${rows['9 Months'].height}</td>
    <td>${rows['9 Months'].weight}</td>
    <td>${rows['9 Months'].vaccines[1].brand}</td>
    <td>${rows['9 Months'].vaccines[1].mfgDate}</td>
    <td>${rows['9 Months'].vaccines[1].expDate}</td>
    <td>${rows['9 Months'].vaccines[1].batchNumber}</td>
    <td>${rows['9 Months'].vaccines[1].hospital}</td>
  </tr>
  
  <tr>
    <td>9-12 Months</td>
    <td>Typhoid</td>
    <td>${rows['9-12 Months'].dueDate}</td>
    <td>${rows['9-12 Months'].vaccines[0].givenDate}</td>
    <td>${rows['9-12 Months'].height}</td>
    <td>${rows['9-12 Months'].weight}</td>
    <td>${rows['9-12 Months'].vaccines[0].brand}</td>
    <td>${rows['9-12 Months'].vaccines[0].mfgDate}</td>
    <td>${rows['9-12 Months'].vaccines[0].expDate}</td>
    <td>${rows['9-12 Months'].vaccines[0].batchNumber}</td>
    <td>${rows['9-12 Months'].vaccines[0].hospital}</td>
  </tr>
  
  <tr>
    <td>12 Months</td>
    <td>HEP-A1</td>
    <td>${rows['12 Months'].dueDate}</td>
    <td>${rows['12 Months'].vaccines[0].givenDate}</td>
    <td>${rows['12 Months'].height}</td>
    <td>${rows['12 Months'].weight}</td>
    <td>${rows['12 Months'].vaccines[0].brand}</td>
    <td>${rows['12 Months'].vaccines[0].mfgDate}</td>
    <td>${rows['12 Months'].vaccines[0].expDate}</td>
    <td>${rows['12 Months'].vaccines[0].batchNumber}</td>
    <td>${rows['12 Months'].vaccines[0].hospital}</td>
  </tr>
  
  <tr>
    <td rowspan="3">15 Months</td>
    <td>MMR-2</td>
    <td>${rows['15 Months'].dueDate}</td>
    <td>${rows['15 Months'].vaccines[0].givenDate}</td>
    <td>${rows['15 Months'].height}</td>
    <td>${rows['15 Months'].weight}</td>
    <td>${rows['15 Months'].vaccines[0].brand}</td>
    <td>${rows['15 Months'].vaccines[0].mfgDate}</td>
    <td>${rows['15 Months'].vaccines[0].expDate}</td>
    <td>${rows['15 Months'].vaccines[0].batchNumber}</td>
    <td>${rows['15 Months'].vaccines[0].hospital}</td>
  </tr>
  <tr>
    <td>Varicella 1</td>
    <td>${rows['15 Months'].dueDate}</td>
    <td>${rows['15 Months'].vaccines[1].givenDate}</td>
    <td>${rows['15 Months'].height}</td>
    <td>${rows['15 Months'].weight}</td>
    <td>${rows['15 Months'].vaccines[1].brand}</td>
    <td>${rows['15 Months'].vaccines[1].mfgDate}</td>
    <td>${rows['15 Months'].vaccines[1].expDate}</td>
    <td>${rows['15 Months'].vaccines[1].batchNumber}</td>
    <td>${rows['15 Months'].vaccines[1].hospital}</td>
  </tr>
  <tr>
    <td>PCV Booster</td>
   <td>${rows['15 Months'].dueDate}</td>
    <td>${rows['15 Months'].vaccines[2].givenDate}</td>
    <td>${rows['15 Months'].height}</td>
    <td>${rows['15 Months'].weight}</td>
    <td>${rows['15 Months'].vaccines[2].brand}</td>
    <td>${rows['15 Months'].vaccines[2].mfgDate}</td>
    <td>${rows['15 Months'].vaccines[2].expDate}</td>
    <td>${rows['15 Months'].vaccines[2].batchNumber}</td>
    <td>${rows['15 Months'].vaccines[2].hospital}</td>
  </tr>

<tr>
    <td rowspan="3">16-18 Months</td>
    <td>DTwp B1/DTaP B1</td>
    <td>${rows['16-18 Months'].dueDate}</td>
    <td>${rows['16-18 Months'].vaccines[0].givenDate}</td>
    <td>${rows['16-18 Months'].height}</td>
    <td>${rows['16-18 Months'].weight}</td>
    <td>${rows['16-18 Months'].vaccines[0].brand}</td>
    <td>${rows['16-18 Months'].vaccines[0].mfgDate}</td>
    <td>${rows['16-18 Months'].vaccines[0].expDate}</td>
    <td>${rows['16-18 Months'].vaccines[0].batchNumber}</td>
    <td>${rows['16-18 Months'].vaccines[0].hospital}</td>
  </tr>
  <tr>
    <td>IPV B1</td>
    <td>${rows['16-18 Months'].dueDate}</td>
    <td>${rows['16-18 Months'].vaccines[1].givenDate}</td>
    <td>${rows['16-18 Months'].height}</td>
    <td>${rows['16-18 Months'].weight}</td>
    <td>${rows['16-18 Months'].vaccines[1].brand}</td>
    <td>${rows['16-18 Months'].vaccines[1].mfgDate}</td>
    <td>${rows['16-18 Months'].vaccines[1].expDate}</td>
    <td>${rows['16-18 Months'].vaccines[1].batchNumber}</td>
    <td>${rows['16-18 Months'].vaccines[1].hospital}</td>
  </tr>
  <tr>
    <td>Hib B1</td>
    <td>${rows['16-18 Months'].dueDate}</td>
    <td>${rows['16-18 Months'].vaccines[2].givenDate}</td>
    <td>${rows['16-18 Months'].height}</td>
    <td>${rows['16-18 Months'].weight}</td>
    <td>${rows['16-18 Months'].vaccines[2].brand}</td>
    <td>${rows['16-18 Months'].vaccines[2].mfgDate}</td>
    <td>${rows['16-18 Months'].vaccines[2].expDate}</td>
    <td>${rows['16-18 Months'].vaccines[2].batchNumber}</td>
    <td>${rows['16-18 Months'].vaccines[2].hospital}</td>
  </tr>
  
  <tr>
    <td>18 Months</td>
    <td>HEP-A2</td>
    <td>${rows['18 Months'].dueDate}</td>
    <td>${rows['18 Months'].vaccines[0].givenDate}</td>
    <td>${rows['18 Months'].height}</td>
    <td>${rows['18 Months'].weight}</td>
    <td>${rows['18 Months'].vaccines[0].brand}</td>
    <td>${rows['18 Months'].vaccines[0].mfgDate}</td>
    <td>${rows['18 Months'].vaccines[0].expDate}</td>
    <td>${rows['18 Months'].vaccines[0].batchNumber}</td>
    <td>${rows['18 Months'].vaccines[0].hospital}</td>
  </tr>
  
  <tr>
    <td rowspan="2">2 Years</td>
    <td>Typhoid Booster</td>
    <td>${rows['2 Years'].dueDate}</td>
    <td>${rows['2 Years'].vaccines[0].givenDate}</td>
    <td>${rows['2 Years'].height}</td>
    <td>${rows['2 Years'].weight}</td>
    <td>${rows['2 Years'].vaccines[0].brand}</td>
    <td>${rows['2 Years'].vaccines[0].mfgDate}</td>
    <td>${rows['2 Years'].vaccines[0].expDate}</td>
    <td>${rows['2 Years'].vaccines[0].batchNumber}</td>
    <td>${rows['2 Years'].vaccines[0].hospital}</td>
  </tr>
  <tr>
    <td>Conjugate Vaccine</td>
    <td>${rows['2 Years'].dueDate}</td>
    <td>${rows['2 Years'].vaccines[1].givenDate}</td>
    <td>${rows['2 Years'].height}</td>
    <td>${rows['2 Years'].weight}</td>
    <td>${rows['2 Years'].vaccines[1].brand}</td>
    <td>${rows['2 Years'].vaccines[1].mfgDate}</td>
    <td>${rows['2 Years'].vaccines[1].expDate}</td>
    <td>${rows['2 Years'].vaccines[1].batchNumber}</td>
    <td>${rows['2 Years'].vaccines[1].hospital}</td>
  </tr>
  
  <td rowspan="3">4-6 Years</td>
    <td>DTwp B2/DTaP B2</td>
   <td>${rows['4-6 Years'].dueDate}</td>
    <td>${rows['4-6 Years'].vaccines[0].givenDate}</td>
    <td>${rows['4-6 Years'].height}</td>
    <td>${rows['4-6 Years'].weight}</td>
    <td>${rows['4-6 Years'].vaccines[0].brand}</td>
    <td>${rows['4-6 Years'].vaccines[0].mfgDate}</td>
    <td>${rows['4-6 Years'].vaccines[0].expDate}</td>
    <td>${rows['4-6 Years'].vaccines[0].batchNumber}</td>
    <td>${rows['4-6 Years'].vaccines[0].hospital}</td>
  </tr>
  <tr>
    <td>OPV3/Varicella 2</td>
    <td>${rows['4-6 Years'].dueDate}</td>
    <td>${rows['4-6 Years'].vaccines[1].givenDate}</td>
    <td>${rows['4-6 Years'].height}</td>
    <td>${rows['4-6 Years'].weight}</td>
    <td>${rows['4-6 Years'].vaccines[1].brand}</td>
    <td>${rows['4-6 Years'].vaccines[1].mfgDate}</td>
    <td>${rows['4-6 Years'].vaccines[1].expDate}</td>
    <td>${rows['4-6 Years'].vaccines[1].batchNumber}</td>
    <td>${rows['4-6 Years'].vaccines[1].hospital}</td>
  </tr>
  <tr>
    <td>MMR 3</td>
    <td>${rows['4-6 Years'].dueDate}</td>
    <td>${rows['4-6 Years'].vaccines[2].givenDate}</td>
    <td>${rows['4-6 Years'].height}</td>
    <td>${rows['4-6 Years'].weight}</td>
    <td>${rows['4-6 Years'].vaccines[2].brand}</td>
    <td>${rows['4-6 Years'].vaccines[2].mfgDate}</td>
    <td>${rows['4-6 Years'].vaccines[2].expDate}</td>
    <td>${rows['4-6 Years'].vaccines[2].batchNumber}</td>
    <td>${rows['4-6 Years'].vaccines[2].hospital}</td>
  </tr>
 
 <tr>
    <td rowspan="2">10-12 Years</td>
    <td>PDAP/TD</td>
    <td>${rows['10-12 Years'].dueDate}</td>
    <td>${rows['10-12 Years'].vaccines[0].givenDate}</td>
    <td>${rows['10-12 Years'].height}</td>
    <td>${rows['10-12 Years'].weight}</td>
    <td>${rows['10-12 Years'].vaccines[0].brand}</td>
    <td>${rows['10-12 Years'].vaccines[0].mfgDate}</td>
    <td>${rows['10-12 Years'].vaccines[0].expDate}</td>
    <td>${rows['10-12 Years'].vaccines[0].batchNumber}</td>
    <td>${rows['10-12 Years'].vaccines[0].hospital}</td>
  </tr>
  <tr>
    <td>HPV</td>
    <td>${rows['10-12 Years'].dueDate}</td>
    <td>${rows['10-12 Years'].vaccines[1].givenDate}</td>
    <td>${rows['10-12 Years'].height}</td>
    <td>${rows['10-12 Years'].weight}</td>
    <td>${rows['10-12 Years'].vaccines[1].brand}</td>
    <td>${rows['10-12 Years'].vaccines[1].mfgDate}</td>
    <td>${rows['10-12 Years'].vaccines[1].expDate}</td>
    <td>${rows['10-12 Years'].vaccines[1].batchNumber}</td>
    <td>${rows['10-12 Years'].vaccines[1].hospital}</td>
  </tr>
</table>
`
}
  ;

/**
 * @description Generate an `html` page with a populated table
 * @param {String} table
 * @returns {String}
 */
const createHtml = (table, baby) => `
  <html>
   <head>
<style>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
th, td {
  padding: 5px;
  text-align: left;    
}
</style>
</head>
    <body>
    <h3>Name: ${baby.name}</h3>
<h3>BirthDate : ${baby.dob}</h3>
<h3>Gender : ${baby.gender.toUpperCase()} </h3>
      ${table}
    </body>
  </html>
`;

/**
 * @description this method takes in a path as a string & returns true/false
 * as to if the specified file path exists in the system or not.
 * @param {String} filePath
 * @returns {Boolean}
 */
const doesFileExist = filePath => {
  try {
    fs.statSync(filePath); // get information of the specified file path.
    return true;
  } catch (error) {
    return false;
  }
};

const createPDF = (data, child, username, childIndex) => {
  if (!data) return;
  try {
    /* Check if the file for `html` build exists in system or not */
    if (doesFileExist(buildPathHtml)) {
      console.log('Deleting old build file');
      /* If the file exists delete the file from system */
      fs.unlinkSync(buildPathHtml);
    }
    /* generate rows */
    // const rows = data.map(createRow).join('');
    /* generate table */
    const table = createTable(data);
    /* generate html */
    const html = createHtml(table, child, username);
    /* write the generated html to file */
    fs.writeFileSync(buildPathHtml, html);
    console.log('Succesfully created an HTML table');

    const options = {
      format: 'A4', height: "14.9in",
      width: "15in"
    };
    const dir = `uploads/${username}/child${childIndex}/index.pdf`;
    pdf.create(html, options).toFile(dir, function (err, res) {
      if (err) return console.log(err);
      console.log(res); // { filename: '/app/businesscard.pdf' }
    });

  } catch (error) {
    console.log('Error generating table', error);
  }
}



module.exports = createPDF;