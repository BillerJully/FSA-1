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

                    <div className={styles.inputContainer}>
                        <label className={styles.inputLabel}>
                            Description:
                        </label>
                        <input
                            className={styles.inputHolder}
                            type="text"
                            name="description"
                            value={updatedTransaction.description || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.inputLabel}>Amount: </label>
                        <input
                            className={styles.inputHolder}
                            type="number"
                            name="amount"
                            value={updatedTransaction.amount || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.inputLabel}>Type:</label>
                        <select
                            className={styles.inputHolder}
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
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.inputLabel}>Category:</label>
                        <select
                            className={styles.inputHolder}
                            name="transactionCategory"
                            value={updatedTransaction.transactionCategory}
                            onChange={handleChange}
                        >
                            {updatedTransaction.transactionType === 'true' ? (
                                <>
                                    <option value="">Select Category</option>
                                    <option value="other income">
                                        Other Income
                                    </option>
                                    <option value="salary">Salary</option>
                                    <option value="scholarship">
                                        Scholarship
                                    </option>
                                    <option value="gifts">Gifts</option>
                                    <option value="other income">
                                        Other Income
                                    </option>
                                </>
                            ) : (
                                <>
                                    <option value="">Select Category</option>
                                    <option value="transport">Transport</option>
                                    <option value="groceries">Groceries</option>
                                    <option value="housing">Housing</option>
                                    <option value="phone and internet">
                                        Phone and internet
                                    </option>
                                    <option value="entertainment">
                                        Entertainment
                                    </option>
                                    <option value="clothing">Clothing</option>
                                    <option value="health">Health</option>
                                    <option value="education">Education</option>
                                    <option value="other expense">
                                        Other expense
                                    </option>
                                </>
                            )}
                        </select>
                    </div>
                    <div className={styles.formButtons}>
                        <button type="submit" className={styles.modalButton}>
                            Update
                        </button>
                        <button
                            type="button"
                            className={styles.modalButton}
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
