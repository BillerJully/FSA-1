import { Router } from 'express'
import Transaction from './Transaction.js'

const router = new Router()

router.post('/transaction', async (req, res) => {
    try {
        const { transactionDate, description, amount, transactionType } =
            req.body
        const transaction = await Transaction.create({
            transactionDate,
            description,
            amount,
            transactionType,
        })
        res.status(201).json(transaction)
    } catch (error) {
        console.error('Ошибка при создании транзакции:', error)
        res.status(500).json({ error: 'Не удалось создать транзакцию' })
    }
})
router.get('/transaction')
router.get('/transaction/:id')
router.put('/transaction/:id')
router.delete('/transaction/:id')

export default router
