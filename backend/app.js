const express = require('express');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/posts')
const mongoose = require('mongoose');

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const app = express();
mongoose.connect("mongodb+srv://dsutton1080:dsuttonAdmin@cluster0.bms6bfv.mongodb.net/?retryWrites=true&w=majority", connectOptions)
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false})); //not needed but doesn't hurt

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', "GET, POOST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use('/api/posts', postRoutes);

module.exports = app;
