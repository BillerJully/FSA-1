export const calculateTotalExpenses = (transactions, dateThreshold) => {
    return transactions
        .filter(
            (transaction) =>
                !transaction.transactionType &&
                new Date(transaction.transactionDate) >= dateThreshold
        )
        .reduce((acc, transaction) => acc + transaction.amount, 0)
}

export const calculateTotalIncomes = (transactions, dateThreshold) => {
    return transactions
        .filter(
            (transaction) =>
                transaction.transactionType &&
                new Date(transaction.transactionDate) >= dateThreshold
        )
        .reduce((acc, transaction) => acc + transaction.amount, 0)
}

export const getDateOneWeekAgo = () => {
    const date = new Date()
    date.setDate(date.getDate() - 7)
    return date
}

export const getDateOneMonthAgo = () => {
    const date = new Date()
    date.setMonth(date.getMonth() - 1)
    return date
}

export const getDateOneYearAgo = () => {
    const date = new Date()
    date.setFullYear(date.getFullYear() - 1)
    return date
}
