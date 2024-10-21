import Transaction from './Transaction.js'

class TransactionController {
    async create(req, res) {
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
    }
    async getAll(req, res) {
        try {
            const transactions = await Transaction.find()
            return res.json(transactions)
        } catch (error) {
            console.error('Ошибка при получении всех транзацкий:', error)
            res.status(500).json({
                error: 'Не удалось полученить все транзакции',
            })
        }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                res.status(400).json({ message: 'Id not found' })
            }
            const transaction = await Transaction.findById(id)
            return res.json(transaction)
        } catch (error) {
            console.error('Ошибка при получении одной транзацкии:', error)
            res.status(500).json({
                error: 'Не удалось полученить одну транзакцию',
            })
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params
            const transaction = req.body
            if (!id) {
                res.status(400).json({ message: 'Id not found' })
            }
            const updatedTransaction = await Transaction.findByIdAndUpdate(
                id,
                transaction,
                { new: true, runValidators: true }
            )
            return res.json(updatedTransaction)
        } catch (error) {
            console.error('Ошибка при обновлении транзакции:', error)
            res.status(500).json({
                error: 'Не удалось обновить транзакции',
            })
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                res.status(400).json({ message: 'Id not found' })
            }
            const transaction = await Transaction.findByIdAndDelete(id)
            return res.json(transaction)
        } catch (error) {
            console.error('Ошибка при удалении транзакции:', error)
            res.status(500).json({
                error: 'Не удалось удалить транзакцию',
            })
        }
    }
}

export default new TransactionController()
