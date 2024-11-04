import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './TransactionsDatesPage.module.css'
import TransactionDate from '../../components/transactionDate/TransactionDate.js'

export default function TransactionsDatesPage() {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const AUTH_TOKEN = localStorage.getItem('authToken')
    const fetchTransactions = async () => {
        try {
            const response = await axios.get(
                'http://localhost:5000/api/transactions',
                { headers: { Authorization: `Bearer ${AUTH_TOKEN}` } }
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
        const date = transaction.transactionDate
        if (!acc[date]) {
            acc[date] = []
        }
        acc[date].push(transaction)
        return acc
    }, {})

    const sortedGroupedTransactions = Object.keys(groupedTransactions)
        .map((date) => ({
            date: new Date(date),
            transactions: groupedTransactions[date],
        }))
        .sort((a, b) => b.date - a.date)
    return (
        <div className={styles.TransactionsDatesPageContainer}>
            <div className={styles.TransactionsDates}>
                {sortedGroupedTransactions.map(({ date, transactions }) => (
                    <TransactionDate
                        key={date.toISOString()}
                        date={date.toLocaleDateString()}
                        transactions={transactions}
                    />
                ))}
            </div>
        </div>
    )
}
