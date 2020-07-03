const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3001;

const productsRoute = require('./routes/products');

// used to allow cross-origin resource sharing
app.use(cors());

// middleware for body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// middleware for homePage
app.use('/', productsRoute);


// connect to DB
mongoose.connect(
    'mongodb://localhost:27017/ecomWebsiteDB',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => console.log('Connected to DB successfully')
);


// port is set to 3001 so it won't conflict with port 3000 on which React.js runs
app.listen(PORT, console.log(`Listening on port ${PORT}`));

