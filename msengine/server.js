const dotenv = require('dotenv').config(),
    express = require('express'),
    cors = require('cors'),
    app = express(),
    morgan = require("morgan"),
    router = require("./routes");

//Middleware declarations
app.use(express.json());
app.use(morgan("dev"));
app.options('*', cors())
app.use(cors());
app.use('/ms_engine/', router);

app.listen(3002, () => console.log('Server is up and running on ' + 3002));

