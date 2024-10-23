import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import styles from './TransactionSummary.module.css'

Chart.register(ArcElement, Tooltip, Legend)

export default function TransactionSummary() {
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

    const totalIncome = transactions
        .filter((transaction) => transaction.transactionType)
        .reduce((acc, transaction) => acc + transaction.amount, 0)

    const formattedTotalIncome = parseFloat(totalIncome.toFixed(2))

    const totalExpenses = transactions
        .filter((transaction) => !transaction.transactionType)
        .reduce((acc, transaction) => acc + transaction.amount, 0)

    const formattedTotalExpenses = parseFloat(totalExpenses.toFixed(2))

    const transactionsData = {
        labels: [],
        datasets: [
            {
                data: [totalIncome, totalExpenses],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    }

    return (
        <div className={styles.summaryHolder}>
            <div className={styles.summaryText}>
                {' '}
                <h2>Transaction Summary</h2>
                <p>
                    <strong>Summary income:</strong> {formattedTotalIncome} ₽
                </p>
                <p>
                    <strong>Summart expense:</strong> {formattedTotalExpenses} ₽
                </p>
            </div>

            <Doughnut data={transactionsData} />
        </div>
    )
}
