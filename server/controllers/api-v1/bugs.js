const express = require('express')
const router = express.Router()
const db = require('../../models')
const requiresToken = require(`../requiresToken`)


// GET /bugs - get list of bugs
router.get('/',async (req,res)=>{
    const bugList = await db.Bug.find()
    res.json(bugList)
})

// POST /bugs/new-bug - add new bug to db
router.post('/new-bug',async (req,res)=>{
    const newBug = await db.Bug.create({
        // user: currentUser,
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        priority: req.body.priority,
    })
})

//PUT /bugs/update - updates bug info (status/comments/priority)
router.put('/update',async(req,res)=>{
    //find bug by id when clicked to update
    const bugToUpdate = await db.Bug.findById()
    //update info from form
    //respond with updated bug info
})

module.exports = router