import express from 'express'

const SERVER_PORT = 5000

const app = express()

app.get('/', (req, res) => {
    res.send(`Server online on ${SERVER_PORT}`)
})

app.listen(SERVER_PORT, () => {
    console.log(`Server started on ${SERVER_PORT}`)
})
