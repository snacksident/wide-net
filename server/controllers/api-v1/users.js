const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../../models')
const requiresToken = require(`../requiresToken`)
// const user = require('../../models/user')

// POST /users/register -- CREATE a new user
router.post('/register', async (req,res)=>{
    try {
        // check if user exists -- don't allow them to sign up again
        const foundUser = await db.User.findOne({
            email: req.body.email
        })
        if(foundUser) return res.status(409).json({msg: 'did you forget that you already signed up with that email'})
        // hash the password (could validate if we wanted ?)
        const salt = 12
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        // create a user in the db
        const newUser = await db.User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        // create a jwt payload to send back to the client
        const payload = {
            name: newUser.name,
            email: newUser.email,
            id: newUser._id
        }
        // sign the jwt and let 'er rip (log them in)
        const token = await jwt.sign(payload,process.env.JWT_SECRET, {expiresIn: 60 * 60})

        res.json({ token })
    } catch (error) {
        console.log(error)
        res.status(503).json({msg: `oopsie daisy`})
    }
})

// POST /users/login -- validate login credentials
router.post('/login',async (req,res)=>{
    //try to find the user in the db that is logging in
    const foundUser = await db.User.findOne({
        email: req.body.email
    })
    //if the user is not found -- return and send back a message that the user needs to sign up
    if(!foundUser) return res.status(400).json({msg: 'bad login credensh brah'})
    //check password from req.body against the password in the db

    const matchPasswords = await bcrypt.compare(req.body.password, foundUser.password)
    if(!matchPasswords) return res.status(400).json({msg: 'bad login credensh brah'})

    const payload = {
        name: foundUser.name,
        email: foundUser.email,
        id: foundUser.id
    }
    //sign the jwt
    const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60})
    //send jwt back
    res.json({token})
})

// GET /users/auth-locked -- example of checking a jwt and not serving data unless jwt is valid
router.get('/auth-locked', requiresToken, (req,res)=>{
    //here we have access to the user on the res.locals
    console.log(`logged in user: ${res.locals.user}`)
    res.json({msg: `welcome to the auth locked route - you made it`})
})

module.exports = router