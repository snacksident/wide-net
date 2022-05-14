require('./models')
require('dotenv').config()
//express things
const express = require('express')

const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3001


//middleware
app.use(cors())
app.use(express.json())

const myMiddleWare = (req,res,next) => {
    next()
}


app.use(myMiddleWare)
app.use('/api-v1/users',require('./controllers/api-v1/users'))
app.use('/api-v1/bugs',require('./controllers/api-v1/bugs'))

app.get('/',(req,res)=>{
    res.json({msg: `welcome, hooked up!`})
})

app.listen(PORT,()=>{
    console.log(`vibing on port ${PORT}`)
})
// httpServer.listen(PORT)