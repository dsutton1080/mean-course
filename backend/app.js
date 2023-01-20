const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post')
const mongoose = require('mongoose');

const app = express();
mongoose.connect("mongodb+srv://dsutton1080:dsuttonAdmin@cluster0.bms6bfv.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
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
  res.setHeader('Access-Control-Allow-Methods', "GET, POOST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {id: 'sdfsklsa', title: 'First server-side-post', content: 'This is coming from the server'},
    {id: 'dfasdfas', title: 'Second server-side-post', content: 'This is coming from the server also'}
  ];
  return res.status(200).json({
    message: 'Posts fetched succesfully!',
    posts: posts
  });
});

module.exports = app;
