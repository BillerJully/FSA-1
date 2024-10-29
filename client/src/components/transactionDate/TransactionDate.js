import React from 'react'
import styles from './TransactionDate.module.css'

export default function TransactionDate({ date, transactions }) {
    return (
        <div className={styles.transactionDateContainer}>
            <h3>{date}</h3>
            <div className={styles.transactionDataContainer}>
                {' '}
                {transactions.map((transaction) => (
                    <div key={transaction._id} className={styles.transaction}>
                        <div
                            className={
                                transaction.transactionType
                                    ? styles.typeCircleIncome
                                    : styles.typeCircleExpense
                            }
                        ></div>
                        <span>{transaction.description}</span>
                        <span>{transaction.amount} ₽ </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
