import React from 'react'
import styles from './TransactionDate.module.css'

export default function TransactionDate({ date, transactions }) {
    return (
        <div className={styles.transactionDateContainer}>
            <h3>{date}</h3>
            {transactions.map((transaction) => (
                <div key={transaction._id} className={styles.transaction}>
                    <span>{transaction.description} - </span>
                    <span>{transaction.amount} ₽ </span>
                    <span>
                        {transaction.transactionType ? 'Income' : 'Expense'}
                    </span>
                </div>
            ))}
        </div>
    )
}
