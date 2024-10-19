import React from 'react'
import styles from './Header.module.css'

export default function Header() {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.leftHeader}>
                <h1 className={styles.headerTitle}>Here is header</h1>
            </div>
            <div className={styles.middleHeader}>
                <div className={styles.headerLinksHolder}>
                    <a>Main page</a>
                    <a>About project</a>
                    <a>Contact us</a>
                </div>
            </div>
            <div className={styles.rightHeader}>
                <button className={styles.headerButton}>Sign in</button>
            </div>
        </div>
    )
}
