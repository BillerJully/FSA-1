import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from '../notfound/NotFound'
import TransactionsTable from '../../components/Transactions/TrransactionsTable/TransactionsTable'
import Sidebar from '../../components/sidebar/Sidebar'
import styles from './Platform.module.css'
const Platform: FC<{}> = () => {
    return (
        <section className={styles.platformSection}>
            <Sidebar />
            <main className={styles.mainContent}>
                <Routes>
                    <Route path="/" element={<div> </div>} />
                    <Route path="/dashboard" element={<TransactionsTable />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </section>
    )
}

export default Platform
