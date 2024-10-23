import React from 'react'
import styles from './styles/TransactionsDatesPage.module.css'
import TransactionDate from '../components/transactionDate/TransactionDate.js'

export default function TransactionsDatesPage() {
    const countDates = 23
    return (
        <div className={styles.TransactionsDatesPageContainer}>
            <div className={styles.TransactionsDates}>
                {' '}
                {Array(countDates)
                    .fill()
                    .map((_, index) => (
                        <TransactionDate key={index} />
                    ))}
            </div>
        </div>
    )
}
