import { Router } from 'express'
import TransactionController from './controllers/transactionController.js'
import { body } from 'express-validator'
import UserController from './controllers/userController.js'
import AuthMiddleware from './middleware/authMiddleware.js'

const router = new Router()

router.post('/transactions', AuthMiddleware, TransactionController.create)
router.get('/transactions', AuthMiddleware, TransactionController.getAll)
router.get('/transactions/:id', AuthMiddleware, TransactionController.getOne)
router.put('/transactions/:id', AuthMiddleware, TransactionController.update)
router.delete('/transactions/:id', AuthMiddleware, TransactionController.delete)

router.post(
    '/register',
    body('username').isLength({ min: 3, max: 32 }),
    body('password').isLength({ min: 3, max: 32 }),
    UserController.register
)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/refresh', UserController.refresh)
router.get('/users', AuthMiddleware, UserController.getAllUsers)
export default router
