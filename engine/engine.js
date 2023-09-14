const dotenv = require('dotenv').config(),
  express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  app = express(),
  shell = require('shelljs'),
  fs = require('fs'),
  { router, setTimerForNotifications } = require("./routes"),
  path = require('path'),
  dir = path.join(__dirname, '/uploads')

app.use(express.static(dir));

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

//Middleware declarations
app.use(bodyParser.json());
app.options('*', cors());
app.use(cors());
app.use('/images', express.static(__dirname + '/uploads/'));
app.use("/api/", router)

setTimerForNotifications();

app.listen(3000, () => console.log('Server is up and running on ' + 3000));
