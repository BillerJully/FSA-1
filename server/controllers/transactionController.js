import Transaction from '../models/Transaction.js'

class TransactionController {
    async create(req, res) {
        try {
            const {
                transactionDate,
                description,
                amount,
                transactionType,
                transactionCategory,
            } = req.body
            const userId = req.user.id
            const transaction = await Transaction.create({
                userId,
                transactionDate,
                description,
                amount,
                transactionType,
                transactionCategory,
            })
            res.status(201).json(transaction)
        } catch (error) {
            console.error('Ошибка при создании транзакции:', error)
            res.status(500).json({ error: 'Не удалось создать транзакцию' })
        }
    }

    async getAll(req, res) {
        try {
            const userId = req.user.id
            const transactions = await Transaction.find({ userId })
            return res.json(transactions)
        } catch (error) {
            console.error('Ошибка при получении всех транзакций:', error)
            res.status(500).json({
                error: 'Не удалось получить все транзакции',
            })
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json({ message: 'Id not found' })
            }
            const transaction = await Transaction.findOne({
                _id: id,
                userId: req.user.id,
            })
            if (!transaction) {
                return res
                    .status(404)
                    .json({ message: 'Transaction not found' })
            }
            return res.json(transaction)
        } catch (error) {
            console.error('Ошибка при получении одной транзакции:', error)
            res.status(500).json({
                error: 'Не удалось получить одну транзакцию',
            })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const transaction = req.body
            if (!id) {
                return res.status(400).json({ message: 'Id not found' })
            }
            const updatedTransaction = await Transaction.findByIdAndUpdate(
                { _id: id, userId: req.user.id },
                transaction,
                { new: true, runValidators: true }
            )
            if (!updatedTransaction) {
                return res
                    .status(404)
                    .json({ message: 'Transaction not found' })
            }
            return res.json(updatedTransaction)
        } catch (error) {
            console.error('Ошибка при обновлении транзакции:', error)
            res.status(500).json({ error: 'Не удалось обновить транзакцию' })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json({ message: 'Id not found' })
            }
            const transaction = await Transaction.findByIdAndDelete({
                _id: id,
                userId: req.user.id,
            })
            if (!transaction) {
                return res
                    .status(404)
                    .json({ message: 'Transaction not found' })
            }
            return res.json(transaction)
        } catch (error) {
            console.error('Ошибка при удалении транзакции:', error)
            res.status(500).json({ error: 'Не удалось удалить транзакцию' })
        }
    }
}

export default new TransactionController()
