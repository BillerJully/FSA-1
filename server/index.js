import express from 'express'
import mongoose from 'mongoose'
import router from './router.js'

const SERVER_PORT = 5000
const DB_URI = 'mongodb://localhost:27017/mydatabase' // Укажите имя вашей базы данных

const app = express()
app.use(express.json())
app.use('/api', router)

mongoose
    .connect(DB_URI)
    .then(() => console.log('Подключение к базе данных установлено'))
    .catch((err) => console.error('Ошибка подключения к базе данных:', err))

app.get('/', (req, res) => {
    res.send(`Server online on ${SERVER_PORT}`)
    console.log(req.query)
    res.status(200).json('server online')
})

app.post('/')

app.listen(SERVER_PORT, () => {
    console.log(`Server started on ${SERVER_PORT}`)
})
