import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './styles/TransactionsDatesPage.module.css'
import TransactionDate from '../components/transactionDate/TransactionDate.js'

export default function TransactionsDatesPage() {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchTransactions = async () => {
        try {
            const response = await axios.get(
                'http://localhost:5000/api/transactions'
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

    const groupedTransactions = transactions.reduce((acc, transaction) => {
        const date = new Date(transaction.transactionDate).toLocaleDateString()
        if (!acc[date]) {
            acc[date] = []
        }
        acc[date].push(transaction)
        return acc
    }, {})
    return (
        <div className={styles.TransactionsDatesPageContainer}>
            <div className={styles.TransactionsDates}>
                {Object.keys(groupedTransactions).map((date) => (
                    <TransactionDate
                        key={date}
                        date={date}
                        transactions={groupedTransactions[date]}
                    />
                ))}
            </div>
        </div>
    )
}
