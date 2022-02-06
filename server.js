const express = require('express')
const cors = require('cors')

const server = express()
const PORT = process.env.PORT || 5000

server.use(cors())

server.get('/api/getList', (req, res) => {
    const list = [
        { id: '0', done: false, title: 'first todo' },
        { id: '1', done: true, title: 'completed todo' },
        { id: '2', done: false, title: 'just todo' }
    ]

    res.json(list)
})

server.get('/', (req, res) => {
    res.send('<h1>hello from server</h1>')
})

// server.get('/api/server', (req, res) => {
//     res.json({ res: '/server' })
// })

server.listen(PORT, () => {
    console.log(`server started on PORT: ${PORT}`)
})
