import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './styles/MainPage.module.css'
import TransactionInputForm from '../components/transactionForm/TransactionInputForm.js'
import TransactionSummary from '../components/transactionSummary/TransactionSummary.js'
import TransactionGeneralizedData from '../components/transactionGeneralizedData/TransactionGeneralizedData.js'
import TransactionExtremum from '../components/transactionExtremum/TransactionExtremum.js'

export default function MainPage() {
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

    const highestExpense = transactions
        .filter((transactions) => !transactions.transactionType)
        .reduce(
            (max, transaction) =>
                transaction.amount > max.amount ? transaction : max,
            { amount: 0 }
        )
    const highesIncome = transactions
        .filter((transactions) => transactions.transactionType)
        .reduce(
            (max, transaction) =>
                transaction.amount > max.amount ? transaction : max,
            { amount: 0 }
        )
    return (
        <div className={styles.mainPageContainer}>
            <div className={styles.leftMainPage}>
                <TransactionInputForm />
            </div>

            <TransactionSummary
                formattedTotalIncome={formattedTotalIncome}
                formattedTotalExpenses={formattedTotalExpenses}
            />
            <div className={styles.rightMainPage}>
                <TransactionGeneralizedData />
                <TransactionExtremum
                    transactionTypeTitle={highesIncome.transactionType}
                    incomeDesct={highesIncome.description}
                    incomeAmount={highesIncome.amount}
                />
                <TransactionExtremum
                    transactionTypeTitle={highestExpense.transactionType}
                    incomeDesct={highestExpense.description}
                    incomeAmount={highestExpense.amount}
                />
            </div>
        </div>
    )
}
