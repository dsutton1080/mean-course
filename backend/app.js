const express = require('express');

const app = express();

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
