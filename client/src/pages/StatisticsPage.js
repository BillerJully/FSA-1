import React from 'react'

import styles from './styles/StatisticsPage.module.css'

import TransactionDataChart from '../components/transactionDataChart/TransactionDataChart.js'
import TransactionReport from '../components/transactionReport/TransactionReport.js'

export default function StatisticsPage() {
    return (
        <div>
            <TransactionDataChart />
            <div className={styles.transactionsReport}>
                <TransactionReport />
                <TransactionReport />
                <TransactionReport />
                <TransactionReport />
            </div>
        </div>
    )
}
