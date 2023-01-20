const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post')
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
  res.setHeader('Access-Control-Allow-Methods', "GET, POOST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: result._id
    });
  });

});

app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then(documents => {
      return res.status(200).json({
        message: 'Posts fetched succesfully!',
        posts: documents
      });
    });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({
    _id: req.params.id
  })
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Post deleted"
      });
    })
});

module.exports = app;
