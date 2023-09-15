const express = require('express'),
  cors = require('cors'),
  app = express(),
  morgan = require("morgan"),
  { router, setTimerForNotifications } = require("./routes"),
  path = require('path'),
  dir = path.join(__dirname, '/uploads')
require('dotenv').config();
app.use(express.static(dir));

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

//Middleware declarations
app.use(express.json());
app.use(morgan("dev"));
app.options('*', cors());
app.use(cors());
app.use('/images', express.static(__dirname + '/uploads/'));
app.use("/api/", router)

setTimerForNotifications();

app.listen(3000, () => console.log('Server is up and running on ' + 3000));
