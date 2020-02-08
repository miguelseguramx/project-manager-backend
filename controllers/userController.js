const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array()})
  }

  const { email, password } = req.body;

  try{
    let user = await User.findOne({ email })
    
    if(user){
      return res.status(400).json({ msg: 'The user already exists'})
    }

    user = new User (req.body) // Create the new user
    const salt = await bcrypt.genSalt(10) // Hashear the passworld
    user.password = await bcrypt.hash(password, salt)

    await user.save() // Save the user

    // Create an firm the JWT
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

  } catch (error){
    console.log(error);
    res.status(400).send("There's been an error")
  }
}