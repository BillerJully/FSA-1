import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './LogoutButton.module.css'
type LogoutButtonProps = {
    text: string
}

const LogoutButton: FC<LogoutButtonProps> = ({ text }) => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('authToken')
        navigate('/ ')
    }
    return (
        <button className={styles.logoutButton} onClick={handleLogout}>
            {text}
        </button>
    )
}

export default LogoutButton
