import React from 'react'
import styles from './Header.module.css'

export default function Header() {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.leftHeader}>
                <h1 className={styles.headerTitle}>FinanceHelper</h1>
            </div>
            <div className={styles.middleHeader}>
                <div className={styles.headerLinksHolder}></div>
            </div>
            <div className={styles.rightHeader}>
                <button className={styles.headerButton}>Sign in</button>
            </div>
        </div>
    )
}
