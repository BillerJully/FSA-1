import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    transactionDate: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    transactionType: {
        type: Boolean,
        required: true,
    },
})

export default mongoose.model('Transaction', TransactionSchema)
