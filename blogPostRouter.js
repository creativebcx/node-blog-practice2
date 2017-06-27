const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const {BlogPost} = require('./models');

const app = express();

const mongoose = require('mongoose');

//add data to BlogPosts
//create: function(title, content, author, publishDate)
//BlogPosts.create('The Weather', 'It is sunny today', 'Eric', '6/13/17');
//BlogPosts.create('Food', 'Pasta is yummy', 'EricD', '6/14/2017');

router.get('/', (req, res) => {
  BlogPost
    .find()
    .limit(10)
    .exec()
    .then(BlogPosts => {
      res.json({
        BlogPosts: BlogPosts.map(
          (BlogPost) => BlogPost.apiRepr())
      });
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
      });
});

router.get('/:id', (req, res) => {
  BlogPost
    .findById(req.params.id)
    .exec()
    .then(post => res.json(post.apiRepr()))
    .catch(err => {
      console.error(error);
      res.status(500).json({error: 'something went wrong!'})
    });
});

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author', 'publishDate'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  BlogPost
    .create({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    })
    .then(BlogPost => res.status(201).json(BlogPost.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Somthing went wrong'});
    });

});

router.put('/:id', jsonParser, (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
      });  
    }
  
  const updated = {};
  const updateableFields = ['title', 'content', 'author'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      update[field] = req.body[field];
    }
  });
  
  BlogPost
    .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
    .exec()
    .then(updatedPost => res.status(201).json(updatedPost.apiRepr()))
    .catch(err => res.status(500).json({message: 'Something went wrong'}));
});

router.delete('/:id', (req, res) => {
  BlogPost
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      console.log('Blog post deleted');
      res.status(204).end();
    })
    .catch(err => res.status(500).json({message: 'Something went wrong'}));
});

app.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
});

module.exports = router;
















