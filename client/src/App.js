import React, { useEffect, useState } from 'react'
import {
    useNavigate,
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom'

import styles from './App.module.css'

import Header from './components/header/Header.js'
import Footer from './components/footer/Footer.js'
import ProtectedRoute from './components/protector/ProtectedRoute.js'
import Register from './components/userAuth/Register.js'
import Login from './components/userAuth/Login.js'
import MainPage from './pages/MainPage.js'
import StatisticsPage from './pages/StatisticsPage.js'
import GeneralTablePage from './pages/GeneralTablePage.js'
import TransactionsDatesPage from './pages/TransactionsDatesPage.js'

function App() {
    return (
        <Router>
            <div className={styles.App}>
                <Header />
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <MainPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/transactions"
                        element={
                            <ProtectedRoute>
                                <GeneralTablePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/statistics"
                        element={
                            <ProtectedRoute>
                                <StatisticsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/dates"
                        element={
                            <ProtectedRoute>
                                <TransactionsDatesPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
                <Footer />
            </div>
        </Router>
    )
}

export default App
