const axios = require('axios');
const fs = require('fs');
const MC_ENGINE_URL = process.env.MC_ENGINE_URL
const BACKEND_URL = process.env.BACKEND_URL
const checkToken = require('../common/middleware').checkToken;

exports.getUserInfo = async (req, res) => {
  checkToken(req, res, async result => {
    if (result.success) {
      const { stream, key } = req.query;
      const response = await axios.get(`${MC_ENGINE_URL}/queryDataByKey?stream=${stream}&key=${key}`);
      const items = response.data.items;
      let data = {}
      if (items.length > 0) {
        data = JSON.parse(items[items.length - 1].data);
      }
      const dir = `uploads/${key}`;
      data.children && data.children.forEach((child, i) => {
        const dir = `uploads/${key}/child${i}`;
        if (fs.existsSync(dir)) {
          child.imageUrl = `${BACKEND_URL}/images/${key}/child${i}/photo.png`;
          child.pdfUrl = `${BACKEND_URL}/images/${key}/child${i}/index.pdf`;
          console.log('inside existsync', child);
        }

      })
      if (fs.existsSync(dir)) {
        data = { ...data, imageUrl: `${BACKEND_URL}/images/${key}/photo.png`, pdfUrl: `${BACKEND_URL}/images/${key}/index.pdf` }
      }
      res.json(data);
    } else {
      res.status(403).json(result);
    }
  });

}


