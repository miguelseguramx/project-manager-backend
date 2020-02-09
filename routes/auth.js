const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authCotroller = require('../controllers/authController');
const auth = require('../middleware/auth')

// api/auth
router.post('/', 
  authCotroller.authUser
);

router.get('/',
  auth,
  authCotroller.authenticatedUser
)

module.exports =  router