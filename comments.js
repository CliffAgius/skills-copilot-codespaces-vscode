// Create web server


// Load modules
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser'); // for parsing POST requests
var multer = require('multer'); // for parsing multipart/form-data (file upload)
var upload = multer({ dest: 'uploads/' }); // set destination folder for file upload

// Load database
var db = require('../db');

// Load config
var config = require('../config');

// Create a new comment
router.post('/add', upload.single('image'), function(req, res) {
  // Add comment to database
  db.addComment(req.body, req.file, function(err, result) {
    if (err) {
      // Error adding comment
      console.log(err);
      res.status(500).send(err);
    } else {
      // Comment added successfully
      res.status(200).send(result);
    }
  });
});

// Get a comment
router.get('/get/:id', function(req, res) {
  // Get comment from database
  db.getComment(req.params.id, function(err, result) {
    if (err) {
      // Error getting comment
      console.log(err);
      res.status(500).send(err);
    } else {
      // Comment retrieved successfully
      res.status(200).send(result);
    }
  });
});

// Get all comments
router.get('/getAll', function(req, res) {
  // Get all comments from database
  db.getAllComments(function(err, results) {
    if (err) {
      // Error getting comments
      console.log(err);
      res.status(500).send(err);
    } else {
      // Comments retrieved successfully
      res.status(200).send(results);
    }
  });
});

// Get all comments for a post
router.get('/getAllForPost/:id', function(req, res) {
  // Get all comments for a post from database
  db.getAllCommentsForPost(req.params.id, function(err, results) {
    if (err) {
      // Error getting comments
      console.log(err);
      res.status(500).send(err);
    } else {
      // Comments retrieved successfully
      res.status(200).send(results);
    }
  });
});

// Delete a comment
router.delete('/delete/:id', function(req, res) {
  // Delete comment from database