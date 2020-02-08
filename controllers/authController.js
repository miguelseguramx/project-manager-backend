const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.authUser = async (req, res) => {
  // Look for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array()})
  }

  const { email, password } = req.body

  try {
    let user = await User.findOne({ email });
    if(!user){
      return res.status(404).json({ msg: 'The user does not exist'})
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);
    if(!passwordCorrect) {
      return res.status(400).json({ msg: 'The password is incorrect' })
    }

    // Create a jwt
    const payload = {
      user: {
        id: user.id
      }
    }

    // Firm the jwt
    jwt.sign(payload, process.env.SECRETWORLD, {
      expiresIn: 3600
    }, (error, token) => {
      if(error) throw error;
      res.json({ token })
    })
    
  } catch (error) {
    console.log(error);
  }
}