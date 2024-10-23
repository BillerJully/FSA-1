import React from 'react'

import TransactionDataChart from '../components/transactionDataChart/TransactionDataChart.js'
import TransactionReport from '../components/transactionReport/TransactionReport.js'

export default function StatisticsPage() {
    return (
        <div>
            <TransactionDataChart />
            <TransactionReport />
        </div>
    )
}
