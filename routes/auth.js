const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authCotroller = require('../controllers/authController');

// api/auth
router.post('/', 
  [
    check('email', 'Add a valid email').isEmail(),
    check('password', 'Must be a minimum of 8 characters').isLength({ min: 6})
  ],
  authCotroller.authUser
);

module.exports =  router