require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const authRouter = require('./router/auth.router')
const apiErrorMiddleware = require('./middlewares/api-error.middleware')

const server = express()
const PORT = process.env.PORT || 5000

server.use(express.json())
server.use(cookieParser())
server.use(cors())
server.use('/api/auth', authRouter)
server.use(apiErrorMiddleware)

// server.get('/api/getList', (req, res) => {
//     const list = [
//         { id: '0', completed: true, title: 'first todo' },
//         { id: '1', completed: false, title: 'create local storage' },
//         { id: '2', completed: false, title: 'upd local storage' },
//         { id: '3', completed: false, title: 'add some styles' }
//     ]

//     res.json(list)
// })

// server.get('/', (req, res) => {
//     res.send('<h1>hello from server</h1>')
// })

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        server.listen(PORT, () => {
            console.log(`server started on PORT: ${PORT}`)
        })
    } catch (error) {}
}

start()
