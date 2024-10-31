import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './styles/Dashboard.module.css'
import TransactionInputForm from '../components/transactionForm/TransactionInputForm.js'
import TransactionSummary from '../components/transactionSummary/TransactionSummary.js'
import TransactionGeneralizedData from '../components/transactionGeneralizedData/TransactionGeneralizedData.js'
import TransactionExtremum from '../components/transactionExtremum/TransactionExtremum.js'
import {
    calculateTotalExpenses,
    calculateTotalIncomes,
    getDateOneWeekAgo,
    getDateOneMonthAgo,
    getDateOneYearAgo,
} from '../utils/calculateTransactions.js'

export default function Dashboard() {
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
        const fetchData = async () => {
            await fetchTransactions()
        }

        fetchData()
        const intervalId = setInterval(fetchData, 5000)

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

    const totalWeekExpenses = calculateTotalExpenses(
        transactions,
        getDateOneWeekAgo()
    )
    const formattedTotalWeekExpenses = parseFloat(totalWeekExpenses.toFixed(2))

    const totalMonthExpenses = calculateTotalExpenses(
        transactions,
        getDateOneMonthAgo()
    )
    const formattedTotalMonthExpenses = parseFloat(
        totalMonthExpenses.toFixed(2)
    )

    const totalYearExpenses = calculateTotalExpenses(
        transactions,
        getDateOneYearAgo()
    )
    const formattedTotalYearExpenses = parseFloat(totalYearExpenses.toFixed(2))

    const totalWeekIncome = calculateTotalIncomes(
        transactions,
        getDateOneWeekAgo()
    )
    const formattedTotalWeekIncomes = parseFloat(totalWeekIncome.toFixed(2))

    const totalMonthIncome = calculateTotalIncomes(
        transactions,
        getDateOneMonthAgo()
    )
    const formattedTotalMonthIncomes = parseFloat(totalMonthIncome.toFixed(2))

    const totalYearIncome = calculateTotalIncomes(
        transactions,
        getDateOneYearAgo()
    )
    const formattedTotalYearIncomes = parseFloat(totalYearIncome.toFixed(2))

    return (
        <div className={styles.mainPageContainer}>
            <div className={styles.leftMainPage}>
                <TransactionInputForm />
            </div>
            <div className={styles.middleMainPage}>
                <div className={styles.firstLine}>
                    {' '}
                    <div className={styles.extremumMainPage}>
                        <TransactionExtremum
                            transactionTypeTitle={highesIncome.transactionType}
                            incomeDesct={highesIncome.description}
                            incomeAmount={highesIncome.amount}
                        />
                        <TransactionExtremum
                            transactionTypeTitle={
                                highestExpense.transactionType
                            }
                            incomeDesct={highestExpense.description}
                            incomeAmount={highestExpense.amount}
                        />
                    </div>
                    <TransactionSummary
                        formattedTotalIncome={formattedTotalIncome}
                        formattedTotalExpenses={formattedTotalExpenses}
                    />
                </div>

                <div className={styles.secondLine}>
                    <TransactionGeneralizedData
                        title="last week"
                        periodTotalIncome={formattedTotalWeekIncomes}
                        periodTotalExpense={formattedTotalWeekExpenses}
                    />

                    <TransactionGeneralizedData
                        title="last month"
                        periodTotalIncome={formattedTotalMonthIncomes}
                        periodTotalExpense={formattedTotalMonthExpenses}
                    />

                    <TransactionGeneralizedData
                        title="last year"
                        periodTotalIncome={formattedTotalYearIncomes}
                        periodTotalExpense={formattedTotalYearExpenses}
                    />
                </div>
            </div>
        </div>
    )
}
