import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './MainPage.module.css'

export default function MainPage() {
    const fullText = 'Make control under your finances!'

    return (
        <div className={styles.mainPageContainer}>
            <div className={styles.titleContainer}>
                <h1 className={styles.mainTitle}>{fullText}</h1>
            </div>
            <div className={styles.buttonContainer}>
                <NavLink to="/register">
                    <button className={styles.mainPageButton}>
                        Create acount
                    </button>
                </NavLink>
                <NavLink to="/login">
                    <button className={styles.mainPageButton}>
                        Login in account
                    </button>
                </NavLink>
            </div>
        </div>
    )
}
