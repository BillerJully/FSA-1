import Reat, { useState } from 'react'
import axios from 'axios'
import styles from './TransactionForm.module.css'

const SERVER_URL = 'http://localhost:5000/api/transactions'

export default function TransactionInputForm() {
    const [transactionDate, setTransactionDate] = useState('')
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const [transactionType, setTransactionType] = useState('income')
    const [transactionCategory, setTransactionCategory] = useState(undefined)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isMessageVisible, setIsMessageVisible] = useState(false)

    const today = new Date().toISOString().split('T')[0]

    const AUTH_TOKEN = localStorage.getItem('authToken')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)
        setIsMessageVisible(true)

        const transactionData = {
            transactionDate,
            description,
            amount: parseFloat(amount),
            transactionType: transactionType === 'income',
            transactionCategory,
        }
        try {
            const response = await axios.post(SERVER_URL, transactionData, {
                headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
            })

            setSuccess('Transaction created successfully!')
            setTransactionDate('')
            setDescription('')
            setAmount('')
            setTransactionType()
            setTransactionCategory(undefined)
        } catch (error) {
            setError('Error creating transaction: ' + error.message)
        }
    }

    return (
        <div className={styles.transactionFormHolder}>
            <form className={styles.inputForm} onSubmit={handleSubmit}>
                <div className={styles.formInput}>
                    <label className={styles.inputLabel}>Date</label>
                    <input
                        className={styles.inputHolder}
                        type="date"
                        max={today}
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
                        onChange={(e) => {
                            setTransactionType(e.target.value)
                        }}
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div className={styles.formInput}>
                    <label className={styles.inputLabel}>Category</label>
                    <select
                        className={styles.inputHolder}
                        value={transactionCategory}
                        onChange={(e) => setTransactionCategory(e.target.value)}
                    >
                        {transactionType === 'income' ? (
                            <>
                                <option value="">Select Category</option>
                                <option value="other income">
                                    Other Income
                                </option>
                                <option value="salary">Salary</option>
                                <option value="scholarship">Scholarship</option>
                                <option value="gifts">Gifts</option>
                                <option value="other income">
                                    Other Income
                                </option>
                            </>
                        ) : (
                            <>
                                <option value="">Select Category</option>
                                <option value="transport">Transport</option>
                                <option value="groceries">Groceries</option>
                                <option value="housing">Housing</option>
                                <option value="phone and internet">
                                    Phone and internet
                                </option>
                                <option value="entertainment">
                                    Entertainment
                                </option>
                                <option value="clothing">Clothing</option>
                                <option value="health">Health</option>
                                <option value="education">Education</option>
                                <option value="other expense">
                                    Other expense
                                </option>
                            </>
                        )}
                    </select>
                </div>
                <button className={styles.inputButton} type="submit">
                    Submit
                </button>
            </form>

            {isMessageVisible && error && (
                <div style={{ color: 'red' }} className={styles.creationinfo}>
                    {error}
                    <button
                        className={styles.creationButton}
                        onClick={() => setIsMessageVisible(false)}
                        style={{ marginLeft: '10px' }}
                    >
                        close
                    </button>
                </div>
            )}
            {isMessageVisible && success && (
                <div style={{ color: 'green' }} className={styles.creationinfo}>
                    {success}
                    <button
                        className={styles.creationButton}
                        onClick={() => {
                            setIsMessageVisible(false)
                        }}
                    >
                        close
                    </button>
                </div>
            )}
        </div>
    )
}
