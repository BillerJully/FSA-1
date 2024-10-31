import React, { useState } from 'react'
import axios from 'axios'
import styles from './UserAuth.module.css'

const SERVER_URL = 'http://localhost:5000/api/register'

export default function Register() {
    const [userAuthData, setUserAuthData] = useState('')
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

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

            const token = response.data
            console.log(token)
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
                </div>
            </form>
        </div>
    )
}
