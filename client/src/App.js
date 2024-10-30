import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import styles from './App.module.css'

import Header from './components/header/Header.js'
import Footer from './components/footer/Footer.js'

import MainPage from './pages/MainPage.js'
import StatisticsPage from './pages/StatisticsPage.js'
import GeneralTable from './pages/GeneralTable.js'
import TransactionsDatesPage from './pages/TransactionsDatesPage.js'

function App() {
    return (
        <Router>
            <div className={styles.App}>
                <Header />
                <Routes>
                    <Route path="" element={<MainPage />} />
                    <Route path="/transactions" element={<GeneralTable />} />
                    <Route path="/statistics" element={<StatisticsPage />} />
                    <Route path="/dates" element={<TransactionsDatesPage />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
