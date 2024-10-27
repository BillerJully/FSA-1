import React from 'react'
import styles from './TransactionExtremum.module.css'

export default function TransactionExtremum({
    transactionTypeTitle,
    incomeDesct,
    incomeAmount,
}) {
    return (
        <div className={styles.TransactionExtremumContainer}>
            <div>
                <h3>
                    {transactionTypeTitle
                        ? 'Biggest income'
                        : 'Biggest expense'}
                </h3>
            </div>
            <p>
                {incomeDesct}: <strong>{incomeAmount}</strong>
            </p>
        </div>
    )
}
