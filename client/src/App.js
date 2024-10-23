import styles from './App.module.css'
import Header from './components/header/Header.js'
import TransactionInputForm from './components/transactionForm/TransactionInputForm.js'
import TransactionTable from './components/transactionTable/TransactionTable.js'
import TransactionSummary from './components/transactionSummary/TransactionSummary.js'
import TransactionDataChart from './components/transactionDataChart/TransactionDataChart.js'
import Footer from './components/footer/Footer.js'

function App() {
    return (
        <div className={styles.App}>
            <Header />

            <div className={styles.data}>
                <TransactionInputForm />
                <TransactionTable />
                <TransactionSummary />
            </div>
            <TransactionDataChart />
            <Footer />
        </div>
    )
}

export default App
