import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './TransactionTable.module.css'
import ModalTransactionUpdate from '../modalTransactionUpdate/ModalTransactionUpdate'

export default function TransactionTable() {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentPage, setCorrentPage] = useState(1)
    const [currentTransaction, setCorrentTransaction] = useState(null)

    const [isOpen, setIsOpen] = useState(false)

    const transactionsPerPage = 15
    const indexOfLastTransaction = currentPage * transactionsPerPage
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage
    const currentTransactions = transactions.slice(
        indexOfFirstTransaction,
        indexOfLastTransaction
    )
    const totalPages = Math.ceil(transactions.length / transactionsPerPage)

    const AUTH_TOKEN = localStorage.getItem('authToken')
    const fetchTransactions = async () => {
        try {
            const response = await axios.get(
                'http://localhost:5000/api/transactions',
                { headers: { Authorization: `Bearer ${AUTH_TOKEN}` } }
            )
            const sortedTransactions = response.data.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )
            setTransactions(response.data)
        } catch (error) {
            setError('Error fetching transactions: ' + error.message)
        } finally {
            setLoading(false)
        }
    }
    const deleteTransaction = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/transactions/${id}`, {
                headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
            })
            fetchTransactions()
        } catch (error) {
            setError('Error deleting transaction: ' + error.message)
        }
    }

    const updateTransaction = async (updatedTransaction) => {
        try {
            await axios.put(
                `http://localhost:5000/api/transactions/${updatedTransaction._id}`,

                updatedTransaction,
                { headers: { Authorization: `Bearer ${AUTH_TOKEN}` } }
            )
            fetchTransactions()
        } catch (error) {
            setError('Error updating transaction: ' + error.message)
        }
    }

    useEffect(() => {
        fetchTransactions()
        setCorrentPage(1)
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
        <div>
            <div className={styles.transactionTableHolder}>
                <table className={styles.transactionsTable}>
                    <thead className={styles.tableHeader}>
                        <tr>
                            <th>Id</th>
                            <th>Added date</th>
                            <th>Transaction date</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Type</th>

                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTransactions.map((transaction, index) => (
                            <tr key={transaction.id}>
                                <td>{indexOfFirstTransaction + index + 1}</td>
                                <td>
                                    {new Date(
                                        transaction.createdAt
                                    ).toLocaleDateString()}
                                </td>
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
                                <td>
                                    <button
                                        onClick={() =>
                                            deleteTransaction(transaction._id)
                                        }
                                        className={styles.deleteButton}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => {
                                            setCorrentTransaction(transaction)
                                            setIsOpen(true)
                                        }}
                                        className={styles.updateButton}
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.pagination}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCorrentPage(index + 1)}
                        className={
                            currentPage === index + 1 ? styles.active : ''
                        }
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <ModalTransactionUpdate
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                transaction={currentTransaction}
                onUpdate={updateTransaction}
                onClose={() => setIsOpen(false)}
            />
        </div>
    )
}
