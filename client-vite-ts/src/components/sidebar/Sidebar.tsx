import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './Sidebar.module.css'
import LogoutButton from '../logoutButton/LogoutButton'

const Sidebar: FC<{}> = () => {
    const logoutText: string = 'Logout'
    return (
        <div className={styles.asideContainer}>
            <nav className={styles.asideNavigation}>
                <NavLink to="/platform">main</NavLink>
                <NavLink to="/platform/dashboard">Dashboard</NavLink>
                <a href="#">link</a>
                <a href="#">link</a>
            </nav>
            <LogoutButton text={logoutText} />
        </div>
    )
}

export default Sidebar
