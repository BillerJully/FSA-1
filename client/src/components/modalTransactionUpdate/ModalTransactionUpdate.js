import React, { useState, useEffect } from 'react'
import styles from './ModalTransactionUpdate.module.css'

export default function ModalTransactionUpdate({
    isOpen,
    setIsOpen,
    transaction,
    onUpdate,
    onClose,
}) {
    const [updatedTransaction, setUpdatedTransaction] = useState({})

    useEffect(() => {
        if (transaction) {
            setUpdatedTransaction(transaction)
        } else {
            setUpdatedTransaction({})
        }
    }, [transaction])

    const handleChange = (e) => {
        const { name, value } = e.target
        setUpdatedTransaction({ ...updatedTransaction, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onUpdate(updatedTransaction)
        onClose()
    }
    if (!transaction) return null
    if (!transaction) return null
    return (
        <div
            className={`${styles.modal} ${isOpen ? styles.active : ''}`}
            onClick={() => setIsOpen(false)}
        >
            <div
                className={`${styles.modalContent} ${
                    isOpen ? styles.active : ''
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <form onSubmit={handleSubmit} className={styles.inputForm}>
                    <h2>Update transaction</h2>

                    <div className={styles.formInput}>
                        <label>
                            Description:
                            <input
                                type="text"
                                name="description"
                                value={updatedTransaction.description || ''}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className={styles.formInput}>
                        <label>
                            Amount:
                            <input
                                type="number"
                                name="amount"
                                value={updatedTransaction.amount || ''}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className={styles.formInput}>
                        <label>
                            Type:
                            <select
                                name="transactionType"
                                value={
                                    updatedTransaction.transactionType
                                        ? 'true'
                                        : 'false'
                                }
                                onChange={handleChange}
                            >
                                <option value="true">Income</option>
                                <option value="false">Expense</option>
                            </select>
                        </label>
                    </div>
                    <div className={styles.formButtons}>
                        <button type="submit">Update</button>
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
