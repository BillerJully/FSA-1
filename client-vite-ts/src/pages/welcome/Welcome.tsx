import { FC } from 'react'
import styles from './Welcome.module.css'
import { NavLink } from 'react-router-dom'

const Welcome: FC<{}> = () => {
    const welcomeText: string = 'Make control under your finances!'
    const isAuth: boolean = !!localStorage.getItem('authToken')
    return (
        <div className={styles.mainPageContainer}>
            <div className={styles.titleContainer}>
                <h1 className={styles.mainTitle}>{welcomeText}</h1>
            </div>
            <div className={styles.buttonContainer}>
                {isAuth ? (
                    <NavLink to="/platform/dashboard">
                        <button className={styles.mainPageButton}>Go in</button>
                    </NavLink>
                ) : (
                    <NavLink to="/auth">
                        <button className={styles.mainPageButton}>Go in</button>
                    </NavLink>
                )}
            </div>
        </div>
    )
}

export default Welcome
