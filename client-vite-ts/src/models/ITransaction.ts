export interface ITransaction {
    id: string
    userId: string
    createdAt: Date
    transactionDate: Date
    description: string
    amount: number
    transactionType: boolean
    transactionCategory: string
}
