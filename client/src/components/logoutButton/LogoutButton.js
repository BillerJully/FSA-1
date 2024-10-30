import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './LogoutButton.module.css'

export default function LogoutButton() {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('authToken')
        navigate('/login')
    }
    return (
        <button className={styles.headerButton} onClick={handleLogout}>
            Log out
        </button>
    )
}
