import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, NavLink } from 'react-router-dom'
import styles from './UserAuth.module.css'

const SERVER_URL = 'http://localhost:5000/api/login'
export default function () {
    const [userAuthData, setUserAuthData] = useState('')
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)
        const userAuthData = {
            username,
            password,
        }

        try {
            const response = await axios.post(SERVER_URL, userAuthData)
            const { token } = response.data

            localStorage.setItem('authToken', token)
            setSuccess('User created!')
            setUserAuthData('')
            setusername('')
            setpassword('')
            navigate('/dashboard')
        } catch (error) {
            setError('Error creating user' + error.message)
        }
    }
    return (
        <div>
            <div>
                <form className={styles.userAuthForm} onSubmit={handleSubmit}>
                    <h2>Log in</h2>
                    <div className={styles.inputContainer}>
                        <label className={styles.labelHolder}></label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                            required
                            className={styles.inputHolder}
                            placeholder="login"
                        ></input>
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.labelHolder}></label>
                        <input
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            className={styles.inputHolder}
                            placeholder="password"
                            type="password"
                            required
                        ></input>
                    </div>
                    <div className={styles.formButtonsContainer}>
                        <button type="submit" className={styles.formButton}>
                            Log in!
                        </button>
                        <NavLink to="/register">
                            <button
                                className={`${styles.formButton} ${styles.navButton}`}
                            >
                                Don`t have account?
                            </button>
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}
