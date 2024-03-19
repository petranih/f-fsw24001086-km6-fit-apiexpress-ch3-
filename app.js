const express = require('express');
const morgan = require("morgan");
const app = express();

const carRouter = require('./route/carRouter');

// middleware untuk membaca json dari request body 
app.use(express.json())

// middleware dari third part = 3rd party middleware
app.use(morgan('dev'));

// middleware kita sendiri
app.use((req, res, next) => {
    next();
});

app.use((req, res, next )=> {
    req.requesTime = new Date().toISOString();
    next();
})
// localhost:8000
app.use("/api/v1/cars", carRouter);
module.exports = app;