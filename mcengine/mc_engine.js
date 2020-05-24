const dotenv = require('dotenv').config(),
    express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    app = express(),
    shell = require('shelljs'),
    fs = require('fs');

//Middleware declarations
//app.use(bodyParser.json());
app.use(bodyParser.json({limit: "50mb"}));
app.options('*', cors())
app.use(cors());
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


//Invoke the application
const routes = require('./routes.js');
routes(app);

app.listen(3000, () => console.log('Server is up and running on ' + 3000));

