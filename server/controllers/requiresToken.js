const jwt = require(`jsonwebtoken`)
const db = require('../models')

async function requiresToken (req,res,next){
    try {
        // get token from client
        const token = req.headers.authorization
        // verify token -- if not verified, will wind up in catch
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        // find user from data in token
        const foundUser = await db.User.findById(decoded.id)
        // mount user on the response for the next middleware / route
        res.locals.user = foundUser
        //invoke next to go to next
        next()
    } catch (error) {
        //if we ended up here, auth has failed
        console.log(error)
        res.status(401).json({msg: `unauthorized user`})
    }
}

module.exports = (requiresToken)