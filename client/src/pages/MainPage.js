import React from 'react'
import TransactionInputForm from '../components/transactionForm/TransactionInputForm.js'
import TransactionSummary from '../components/transactionSummary/TransactionSummary.js'
import TransactionGeneralizedData from '../components/transactionGeneralizedData/TransactionGeneralizedData.js'
import TransactionExtremum from '../components/transactionExtremum/TransactionExtremum.js'

export default function MainPage() {
    return (
        <div>
            <TransactionInputForm />
            <TransactionSummary />
            <TransactionGeneralizedData />
            <TransactionExtremum />
        </div>
    )
}
