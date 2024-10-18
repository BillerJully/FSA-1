import React, { useState } from 'react'
import axios from 'axios'

const TransactionForm = () => {
    const [transactionDate, setTransactionDate] = useState('')
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const [transactionType, setTransactionType] = useState('income') // 'income' или 'expense'
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)

        const transactionData = {
            transactionDate,
            description,
            amount: parseFloat(amount),
            transactionType: transactionType === 'income',
        }

        try {
            const response = await axios.post(
                'http://localhost:5000/api/transaction',
                transactionData
            )
            setSuccess('Transaction created successfully!')
            // Очистить поля формы после успешной отправки setTransactionDate('');
            setDescription('')
            setAmount('')
            setTransactionType('income')
        } catch (error) {
            setError('Error creating transaction: ' + error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Transaction Form</h2>

            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>{success}</div>}

            <div>
                <label>Date:</label>
                <input
                    type="date"
                    value={transactionDate}
                    onChange={(e) => setTransactionDate(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    step="0.01"
                />
            </div>

            <div>
                <label>Type:</label>
                <select
                    value={transactionType}
                    onChange={(e) => setTransactionType(e.target.value)}
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>

            <button type="submit">Submit</button>
        </form>
    )
}

export default TransactionForm
