import { FC, useState } from 'react'
import axios from 'axios'
import styles from './AuthFrom.module.css'
import { useNavigate } from 'react-router-dom'

const SERVER_URL: string = 'http://localhost:5000/api/register'

type userAuth = {
    username: string
    password: string
}

const RegisterForm: FC<{}> = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [isMsgVis, setIsMsgVis] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)
        setIsMsgVis(false)
        const userAuthData: userAuth = {
            username,
            password,
        }

        try {
            const response = await axios.post(SERVER_URL, userAuthData)
            setSuccess(`${userAuthData.username} user created!`)
            setUsername('')
            setPassword('')
            navigate('/auth')
        } catch (error: any) {
            setError('Error creating user' + error.message)
        }
    }

    return (
        <div className={styles.authContainer}>
            <form className={styles.authForm} onSubmit={handleSubmit}>
                <h2>Register page</h2>
                <div className={styles.inputContainer}>
                    <label htmlFor=""></label>
                    <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="username"
                        className={styles.inputHandler}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor=""></label>
                    <input
                        value={password}
                        type="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        className={styles.inputHandler}
                    />
                </div>
                <div>
                    <button className={styles.authFormButton} type="submit">
                        Register to service
                    </button>
                </div>
                {isMsgVis && success && (
                    <div>
                        {success}
                        <button
                            onClick={() => setIsMsgVis(false)}
                            style={{ marginLeft: '10px' }}
                        >
                            Go login!
                        </button>
                    </div>
                )}
                {isMsgVis && error && (
                    <div>
                        {error}
                        <button
                            onClick={() => setIsMsgVis(false)}
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

export default RegisterForm
