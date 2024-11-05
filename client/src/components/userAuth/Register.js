import React, { act, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import styles from './UserAuth.module.css'

const SERVER_URL = 'http://localhost:5000/api/register'

export default function Register() {
    const [userAuthData, setUserAuthData] = useState('')
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isMessageVisible, setIsMessageVisible] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)
        setIsMessageVisible(true)
        const userAuthData = {
            username,
            password,
        }

        try {
            const response = await axios.post(SERVER_URL, userAuthData)

            const { accessToken } = response.data
            console.log(accessToken)
            setSuccess('User created!')
            setUserAuthData('')
            setusername('')
            setpassword('')
        } catch (error) {
            setError('Error creating user' + error.message)
        }
    }
    return (
        <div>
            <form className={styles.userAuthForm} onSubmit={handleSubmit}>
                <h2>Create new account</h2>
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
                        Create account now!
                    </button>
                    <NavLink to="/login">
                        <button
                            className={`${styles.formButton} ${styles.navButton}`}
                        >
                            Have account?
                        </button>
                    </NavLink>
                </div>
                {isMessageVisible && success && (
                    <div>
                        {success}
                        <NavLink to="/login">
                            <button
                                className={styles.creationButton}
                                onClick={() => setIsMessageVisible(false)}
                                style={{ marginLeft: '10px' }}
                            >
                                Go login!
                            </button>
                        </NavLink>
                    </div>
                )}
                {isMessageVisible && error && (
                    <div>
                        {error}
                        <button
                            className={styles.creationButton}
                            onClick={() => setIsMessageVisible(false)}
                            style={{ marginLeft: '10px' }}
                        >
                            close
                        </button>
                    </div>
                )}
            </form>
        </div>
    )
}
