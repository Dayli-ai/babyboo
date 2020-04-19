const axios = require('axios');
const fs = require('fs');
const url = 'http://3.92.215.217:3000';
const url1 = 'http://3.92.215.217:3001';
const checkToken = require('../common/middleware').checkToken;

exports.getUserInfo = async (req, res) => {
  const { authorization } = req.headers;
  checkToken(req, res, async result => {
    if(result.success) {
      const {stream, key} = req.query;
      const response = await axios.get(`${url}/queryDataByKey?stream=${stream}&key=${key}`);
      const items = response.data.items;
      let data = {}
      if (items.length > 0) {
        data = JSON.parse(items[items.length -1].data);
      }
      const  dir = `uploads/${key}`;
      data.children && data.children.forEach( (child,i) => {
        const dir = `uploads/${key}/child${i}`;
        console.log('dir', dir);
        if (fs.existsSync(dir)){
          child.imageUrl =  `${url1}/images/${key}/child${i}/photo.png`;
          child.pdfUrl = `${url1}/images/${key}/child${i}/index.pdf`;
          console.log('inside existsync', child);
        }

      })
      console.log('children', data.children);
      if (fs.existsSync(dir)){
       data = { ...data, imageUrl: `${url1}/images/${key}/photo.png`, pdfUrl: `${url1}/images/${key}/index.pdf` }
      }
      res.json(data);
    }else {
      res.status(403).json(result);
    }
  });

}


