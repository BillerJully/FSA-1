import React from 'react'
import { NavLink } from 'react-router-dom'
import LogoutButton from '../logoutButton/LogoutButton'
import styles from './Sidebar.module.css'

export default function Sidebar() {
    return (
        <div className={styles.sidebarContainer}>
            <nav className={styles.sidebarHolder}>
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.button} ${styles.active}`
                            : styles.button
                    }
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/transactions"
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.button} ${styles.active}`
                            : styles.button
                    }
                >
                    Transactions
                </NavLink>
                <NavLink
                    to="/statistics"
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.button} ${styles.active}`
                            : styles.button
                    }
                >
                    Stat
                </NavLink>
                <NavLink
                    to="/dates"
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.button} ${styles.active}`
                            : styles.button
                    }
                >
                    Dates
                </NavLink>
            </nav>
            <LogoutButton />
        </div>
    )
}
