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
        const foundUser = await db.User.findOne({
            email: req.body.email
        })
        if(foundUser) return res.status(409).json({msg: 'did you forget that you already signed up with that email'})
        const salt = 12
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = await db.User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        const payload = {
            name: newUser.name,
            email: newUser.email,
            id: newUser._id
        }
        const token = await jwt.sign(payload,process.env.JWT_SECRET, {expiresIn: 60 * 60})

        res.json({ token })
    } catch (error) {
        console.log(error)
        res.status(503).json({msg: `oopsie daisy`})
    }
})

// POST /users/login -- validate login credentials
router.post('/login',async (req,res)=>{
    const foundUser = await db.User.findOne({
        email: req.body.email
    })
    if(!foundUser) return res.status(400).json({msg: 'bad login credensh brah'})
    const matchPasswords = await bcrypt.compare(req.body.password, foundUser.password)
    if(!matchPasswords) return res.status(400).json({msg: 'bad login credensh brah'})
    const payload = {
        name: foundUser.name,
        email: foundUser.email,
        id: foundUser.id
    }
    const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60})
    res.json({token})
})

// GET /users/auth-locked -- example of checking a jwt and not serving data unless jwt is valid
router.get('/auth-locked', requiresToken, (req,res)=>{
    res.json({msg: `welcome to the auth locked route - you made it`})
})

module.exports = router