import React from 'react'
import styles from './TransactionGeneralizedData.module.css'

export default function TransactionGeneralizedData({
    title,
    periodTotalIncome,
    periodTotalExpense,
}) {
    const totalPeriod = periodTotalIncome + periodTotalExpense
    const incomePercentage =
        totalPeriod > 0 ? (periodTotalIncome / totalPeriod) * 100 : 0
    const expensePercentage =
        totalPeriod > 0 ? (periodTotalExpense / totalPeriod) * 100 : 0
    return (
        <div className={styles.transactionGeneralizedContainer}>
            <div className={styles.containerTitle}>
                <h3>{title}</h3>
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.periodDiagram}>
                    <div
                        className={styles.incomeBar}
                        style={{ width: `${incomePercentage}%` }}
                    />
                    <div
                        className={styles.expenseBar}
                        style={{ width: `${expensePercentage}%` }}
                    />
                </div>
                <div className={styles.periodDescription}>
                    <p>
                        <strong>Incomes:</strong>
                        {periodTotalIncome}
                    </p>

                    <p>
                        <strong>Expenses:</strong>
                        {periodTotalExpense}
                    </p>
                </div>
            </div>
        </div>
    )
}
