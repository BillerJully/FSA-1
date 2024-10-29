import User from './User.js'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'testtest'

class UserController {
    async register(req, res) {
        try {
            const { username, password } = req.body
            const user = await User.create({ username, password })
            res.status(201).json(user)
        } catch (error) {
            console.error('Ошибка при создании пользователя:', error)
            res.status(500).json({ error: 'Не удалось создать пользователя' })
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({ username })
            if (!user || !(await user.isValidPassword(password))) {
                return res.status(401).json({ message: 'invalid data' })
            }
            const token = jwt.sign({ id: user._id }, JWT_SECRET, {
                expiresIn: '1h',
            })
            res.json({ token })
        } catch (error) {
            res.status(400).json({ message: 'ошибка авторизации' })
        }
    }
}

export default new UserController()
