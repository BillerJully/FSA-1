import { FC } from 'react'
import styles from './Main.module.css'

type Props = {
    children: JSX.Element
}

const Main: FC<Props> = ({ children }) => {
    return <main className={styles.mainContainer}>{children}</main>
}

export default Main
