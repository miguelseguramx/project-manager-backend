const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
  // Read the token from the header 
  const token = req.header('x-auth-token')

  // Check for token
  if(!token) {
    return res.status(401).json({ msg: 'No token, invalid permission'})
  }

  // Validate the token
  try {
    const encryption = jwt.verify(token, process.env.SECRETWORLD)
    req.user = encryption.user
    next()
  } catch (error) {
    res.status(401).json({ msg: 'The token is not valid'})
  } 
}