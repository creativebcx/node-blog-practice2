const express = require('express');
const app = express();
const morgan = require('morgan');

const {DATABASE_URL, PORT} = require('./config');
const {BlogDb} = require('./models');

const blogPostsRouter = require('./blogPostRouter');

app.use(morgan('common'));

// mongoose 
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;



// blog posts router
app.use('/blog-posts', blogPostsRouter);

let server;

// run server function
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
    
    server = app.listen(port, () => {
      console.log('Your app is listening on port ${port}');
    resolve();
  })
  .on('error', err => {
    mongoose.disconnect();
    reject(err);
    });
  });
});
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();    
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};












