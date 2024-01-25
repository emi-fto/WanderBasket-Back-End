const jwt = require('jsonwebtoken')

const isAuthenticated = (req, res, next) => {
  try {
    
    if (req.headers.authorization?.split(' ')[0] === 'Bearer') {
      const token = req.headers.authorization.split(' ')[1]
      const payload = jwt.verify(token, process.env.TOKEN_SECRET)

      req.tokenPayload = payload // { userId }
      next()
    } else {
      throw new Error('No token')
    }
  } catch (error) {
    res.status(401).json('Token is not provided or not valid')
  }
}

module.exports = { isAuthenticated }