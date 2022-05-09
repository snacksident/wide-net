const express = require('express')
const router = express.Router()
const db = require('../../models')
const requiresToken = require(`../requiresToken`)

router.get('/',(req,res)=>{
    res.json({msg: "yo"})
})

router.post('/new-bug',async (req,res)=>{
    const newBug = await db.Bug.create({
        // user: currentUser,
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        priority: req.body.priority,
    })
})

module.exports = router