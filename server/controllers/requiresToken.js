const jwt = require(`jsonwebtoken`)
const db = require('../models')

async function requiresToken (req,res,next){
    try {
        const token = req.headers.authorization
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const foundUser = await db.User.findById(decoded.id)
        res.locals.user = foundUser
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({msg: `unauthorized user`})
    }
}

module.exports = (requiresToken)