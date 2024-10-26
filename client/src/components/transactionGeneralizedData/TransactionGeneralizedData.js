import React from 'react'
import styles from './TransactionGeneralizedData.module.css'

export default function TransactionGeneralizedData({
    title,
    transactionsByPeriod,
}) {
    console.log(transactionsByPeriod)
    return (
        <div className={styles.transactionGeneralizedContainer}>
            <h3>{title}</h3>
        </div>
    )
}
