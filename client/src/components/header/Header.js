import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header() {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.leftHeader}>
                <h1 className={styles.headerTitle}>FinanceHelper</h1>
            </div>
            <div className={styles.middleHeader}>
                <div className={styles.headerLinksHolder}>
                    <nav>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? `${styles.button} ${styles.active}`
                                    : styles.button
                            }
                        >
                            Home
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
                </div>
            </div>
            <div className={styles.rightHeader}>
                <button className={styles.headerButton}>Sign in</button>
            </div>
        </div>
    )
}
