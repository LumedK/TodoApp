const express = require('express')

const server = express()
const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`server started on PORT: ${PORT}`)
})
