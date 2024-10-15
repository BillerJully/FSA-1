import { Router } from 'express'
import TransactionController from './transactionController.js'

const router = new Router()

router.post('/transaction', TransactionController.create)
router.get('/transaction', TransactionController.getAll)
router.get('/transaction/:id', TransactionController.getOne)
router.put('/transaction', TransactionController.update)
router.delete('/transaction/:id', TransactionController.delete)

export default router
