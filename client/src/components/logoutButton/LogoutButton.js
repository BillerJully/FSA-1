import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './LogoutButton.module.css'

export default function LogoutButton() {
    const navigate = useNavigate()
    const isAuthenticated = !!localStorage.getItem('authToken')
    const handleLogout = () => {
        localStorage.removeItem('authToken')
        navigate('/login')
    }
    return (
        <button className={styles.headerButton} onClick={handleLogout}>
            {isAuthenticated ? 'Log out' : 'Log in'}
        </button>
    )
}
