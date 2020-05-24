const axios = require('axios');
const nodemailer = require('nodemailer');

const url = 'http://34.207.213.121:3000';
//const url = 'http://3.91.182.21:3000';

exports.forgotPassword = async function(req, res) {
  let username = req.body.username;

  const stream = 'bb_stream';

  try {
    const response = await axios.get(`${url}/queryDataByKey?stream=${stream}&key=${username}`);
    const items = response.data.items;
    let data = {}
    if (items.length > 0) {
      data = JSON.parse(items[items.length -1].data);
      const password  = data.password;
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: 'info@babyboo.in', // generated ethereal user
          pass: 'NetStar2019' // generated ethereal password
        }
      });
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: 'info@babyboo.in', // sender address
        to: `${username}`, // list of receivers
        subject: 'Password', // Subject line
        text: `Hello your password is ${password}`, // plain text body
      });

      console.log('Message sent: %s', info.messageId);
      res.json('success');
    }
    else {
      res.status(403).json(`Email doesn't exist`);
    }





  }catch(e) {
    res.status(403).json(e);
  }

};

exports.index = async function(req, res) {
  res.json({
    success: true,
    message: 'Index page',
  });
};
