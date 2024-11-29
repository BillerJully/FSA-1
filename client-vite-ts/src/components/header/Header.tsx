import { FC } from 'react'
import styles from './Header.module.css'

const Header: FC<{}> = () => {
    return (
        <header className={styles.headerSection}>
            <div className={styles.leftHeader}>
                <h1 className={styles.headerTitle}>FinanceHelper</h1>
            </div>
            <div className={styles.rightHeader}>sddf</div>
        </header>
    )
}

export default Header
