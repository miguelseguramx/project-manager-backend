const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator')

// Create user //api/users
router.post('/', 
  [
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'Add a valid email').isEmail(),
    check('password', 'Must be a minimum of 8 characters').isLength({ min: 8})
  ],
  userController.createUser
);

module.exports =  router