import './App.css'
import Table from './Table.js'
import TransactionForm from './TransactionForm'

function App() {
    return (
        <div className="App">
            <TransactionForm />
            <div className="transaction-form">
                <Table />
            </div>
        </div>
    )
}

export default App
