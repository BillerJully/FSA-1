import { FC, useState, useEffect } from 'react'
import axios from 'axios'
import { ITransaction } from '../../../models/ITransaction'
import styles from './TransactionsTable.module.css'

const TransactionsTable: FC<{}> = () => {
    const [transactions, setTransactions] = useState<ITransaction[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<any>(null)
    const [currentPage, setCorrentPage] = useState(1)

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

            setTransactions(response.data)
        } catch (error) {
            setError('Error fetching transactions: ')
        } finally {
            setLoading(false)
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
        <div className={styles.tableContainer}>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Added date</th>
                            <th>Transaction date</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Type</th>
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
                                <td>
                                    {transaction.transactionCategory
                                        ? transaction.transactionCategory
                                        : 'unknown'}
                                </td>
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
            <div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCorrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default TransactionsTable
