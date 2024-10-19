import styles from './App.module.css'
import Header from './components/header/Header.js'
import TransactionInputForm from './components/transactionForm/TransactionInputForm.js'
import Table from './Table.js'
import TransactionTable from './components/transactionTable/TransactionTable.js'
import TransactionForm from './TransactionForm'

function App() {
    return (
        <div className={styles.App}>
            <Header />
            <div className={styles.data}>
                <TransactionInputForm />
                <TransactionTable />
            </div>
        </div>
    )
}

export default App
