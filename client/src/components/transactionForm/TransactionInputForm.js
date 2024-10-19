import Reat, { useState } from 'react'
import axios from 'axios'
import styles from './TransactionForm.module.css'

const SERVER_URL = 'http://localhost:5000/api/transaction'

export default function TransactionInputForm() {
    const [transactionDate, setTransactionDate] = useState('')
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const [transactionType, setTransactionType] = useState('')
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
            const response = await axios.post(SERVER_URL, transactionData)
            setSuccess('Transaction created successfully!')
            setDescription('')
            setAmount('')
            setTransactionType('income')
        } catch (error) {
            setError('Error creating transaction: ' + error.message)
        }
    }

    return (
        <div className={styles.transactionFormHolder}>
            <form className={styles.inputForm} onSubmit={handleSubmit}>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {success && <div style={{ color: 'green' }}>{success}</div>}
                <div className={styles.formInput}>
                    <label className={styles.inputLabel}>Date</label>
                    <input
                        className={styles.inputHolder}
                        type="date"
                        value={transactionDate}
                        onChange={(e) => setTransactionDate(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formInput}>
                    <label className={styles.inputLabel}>Description</label>
                    <input
                        className={styles.inputHolder}
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formInput}>
                    <label className={styles.inputLabel}>Amount</label>
                    <input
                        className={styles.inputHolder}
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formInput}>
                    <label className={styles.inputLabel}>Type</label>
                    <select
                        className={styles.inputHolder}
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value)}
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <button className={styles.inputButton} type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}