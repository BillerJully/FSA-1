import React from 'react'
import styles from './styles/MainPage.module.css'
import TransactionInputForm from '../components/transactionForm/TransactionInputForm.js'
import TransactionSummary from '../components/transactionSummary/TransactionSummary.js'
import TransactionGeneralizedData from '../components/transactionGeneralizedData/TransactionGeneralizedData.js'
import TransactionExtremum from '../components/transactionExtremum/TransactionExtremum.js'

export default function MainPage() {
    return (
        <div className={styles.mainPageContainer}>
            <div className={styles.leftMainPage}>
                <TransactionInputForm />
            </div>
            <TransactionSummary />
            <div className={styles.rightMainPage}>
                <TransactionGeneralizedData />
                <TransactionExtremum /> <TransactionExtremum />
            </div>
        </div>
    )
}
