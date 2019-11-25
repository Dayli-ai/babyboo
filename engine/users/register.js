const axios = require('axios');
const nodemailer = require('nodemailer');

const url = 'http://34.207.213.121:3000';

exports.createUser = async (req, res) => {
  const { key, data } = req.body;
  const userData = {
    stream: 'bb_stream',
    key: key,
    data: data,
  };
  try {
    const queryResponse = await axios.get(
      `${url}/queryDataByKey?stream=bb_stream&key=${key}`,
    );
    const items = queryResponse.data.items;
    if (items.length > 0) {
      // return res.status(403).json('Username/emailid already exists');
    }
    const response = await axios.post(`${url}/registerUser`, userData);
    console.log(response);
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: 'thrinethra@statwig.com', // generated ethereal user
        pass: 'apsd2002', // generated ethereal password
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'mytu3nu@gmail.com', // sender address
      to: `${key}`, // list of receivers
      subject: 'Welcome to BabyBoo!', // Subject line
      text: `Hi ${data.name},

Welcome to BabyBoo.
Now save your child's vaccine cards digitally forver. Enjoy additional features 
such as-
>Tracking your child's growth and Development
>Get Food charts for different ages and many more..

Hope you have a great experience.
We are delighted to have you onboard.

Thank you,
Team BabyBoo.`, // plain text body
    });

    console.log('Message sent: %s', info.messageId);
    res.json(response.data);
  } catch (e) {
    res.status(403).json(e);
  }
};
