import { Router } from 'express'
import TransactionController from './transactionController.js'
import UserController from './userController.js'
import jwt from 'jsonwebtoken'
const JWT_SECRET = 'testtest'

const router = new Router()

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.sendStatus(401)

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

router.post('/transactions', authenticateJWT, TransactionController.create)
router.get('/transactions', authenticateJWT, TransactionController.getAll)
router.get('/transactions/:id', authenticateJWT, TransactionController.getOne)
router.put('/transactions/:id', authenticateJWT, TransactionController.update)
router.delete(
    '/transactions/:id',
    authenticateJWT,
    TransactionController.delete
)

router.post('/register', UserController.register)
router.post('/login', UserController.login)
export default router
