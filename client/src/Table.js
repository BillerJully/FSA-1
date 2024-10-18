import React, { useEffect, useState } from 'react'
import axios from 'axios'

const TransactionTable = () => {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
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

        fetchTransactions()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>
    }

    return (
        <div>
            <h2>Transaction List</h2>
            <table>
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

export default TransactionTable
