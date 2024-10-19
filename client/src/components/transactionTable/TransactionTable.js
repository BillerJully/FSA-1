import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './TransactionTable.module.css'

export default function TransactionTable() {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchTransactions = async () => {
        try {
            const response = await axios.get(
                'http://localhost:5000/api/transaction'
            )
            setTransactions(response.data)
        } catch (error) {
            setError('Error fetching transactions: ' + error.message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchTransactions()

        const intervalId = setInterval(() => {
            fetchTransactions()
        }, 5000)

        return () => clearInterval(intervalId)
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>
    }
    return (
        <div className={styles.transactionTableHolder}>
            <table className={styles.transactionsTable}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>
                                {new Date(
                                    transaction.transactionDate
                                ).toLocaleDateString()}
                            </td>
                            <td>{transaction.description}</td>
                            <td>{transaction.amount}</td>
                            <td>
                                {transaction.transactionType
                                    ? 'Income'
                                    : 'Expense'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
