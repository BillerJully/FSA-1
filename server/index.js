import express from 'express'
import { MongoClient } from 'mongodb'

const SERVER_PORT = 5000
const DB_URI = 'mongodb://localhost:27017/'

const app = express()
app.use(express.json())
const dbClient = new MongoClient(DB_URI)

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(`Server online on ${SERVER_PORT}`)
    console.log(req.query)

    res.status(200).json('server online')
})

app.post('/', (req, res) => {
    console.log(req.body)
    res.send(`Server online on ${SERVER_PORT}`)
    console.log(req.query)

    res.status(200).json('server online')
})

app.post('/user')

async function startApp(params) {
    try {
        app.listen(SERVER_PORT, () => {
            console.log(`Server started on ${SERVER_PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

startApp()
