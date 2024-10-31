import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header() {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.leftHeader}>
                <NavLink className={styles.headerTitle} to="/">
                    <h1 className={styles.headerTitle}>FinanceHelper</h1>{' '}
                </NavLink>
            </div>
            <div className={styles.middleHeader}></div>

            <div className={styles.rightHeader}>
                <NavLink to="/register">
                    <button className={styles.headerButton}>Register</button>
                </NavLink>
                <NavLink to="/login">
                    <button className={styles.headerButton}>Log In</button>
                </NavLink>
            </div>
        </div>
    )
}
