import express from 'express'
import mongoose from 'mongoose'
import router from './router.js'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import ErrorMiddleware from './middleware/errorMiddleware.js'

dotenv.config()

const SERVER_PORT = process.env.SERVER_PORT
const DB_URI = process.env.DB_URI // Укажите имя вашей базы данных

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use('/api', router)

app.use(ErrorMiddleware)

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
