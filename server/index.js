require('./models')
require('dotenv').config()
//express things
const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')

const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3001
const httpServer = createServer(app)
const io = new Server(httpServer, { 
    cors: {
        origin: '*',
        methods: ['GET','POST']
    }
 })


//middleware
app.use(cors())
app.use(express.json())

const myMiddleWare = (req,res,next) => {
    next()
}

io.on('connection', (socket) => {
    console.log(socket.id)
})

app.use(myMiddleWare)
app.use('/api-v1/users',require('./controllers/api-v1/users'))

app.get('/',(req,res)=>{
    res.json({msg: `welcome, hooked up!`})
})

// app.listen(PORT,()=>{
//     console.log(`vibing on port ${PORT}`)
// })
httpServer.listen(PORT)