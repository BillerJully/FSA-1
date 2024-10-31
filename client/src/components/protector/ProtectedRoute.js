import React from 'react'
import { Navigate } from 'react-router-dom'
import styles from '../../App.module.css'
import Sidebar from '../sidebar/Sidebar'

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('authToken')

    return (
        <div className={styles.protectedContainer}>
            <div className={styles.protectedSlideBar}>
                <Sidebar />
            </div>

            <div className={styles.protectedMainInformation}>
                {isAuthenticated ? children : <Navigate to="/login" />}
            </div>
        </div>
    )
}

export default ProtectedRoute
