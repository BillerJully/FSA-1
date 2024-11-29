import React, { FC, useState } from 'react'
import LoginForm from '../../components/auth/LoginForm'
import RegisterForm from '../../components/auth/RegisterForm'
import { NavLink, Routes, Route } from 'react-router-dom'

import styles from './AuthPage.module.css'

const AuthPage: FC<{}> = () => {
    return (
        <section className={styles.authSection}>
            <div className={styles.authForms}>
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/registration" element={<RegisterForm />} />
                </Routes>
            </div>

            <NavLink to="/">
                <button>Click me</button>
            </NavLink>
        </section>
    )
}

export default AuthPage
