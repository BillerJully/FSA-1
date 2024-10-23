import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import styles from './TransactionSummary.module.css'

Chart.register(ArcElement, Tooltip, Legend)

export default function TransactionSummary({
    formattedTotalIncome,
    formattedTotalExpenses,
}) {
    const transactionsData = {
        labels: [],
        datasets: [
            {
                data: [formattedTotalIncome, formattedTotalExpenses],
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
            <div className={styles.chartContainer}>
                <Doughnut data={transactionsData} />
            </div>
        </div>
    )
}
