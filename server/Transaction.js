import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User ',
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
        required: false,
    },
    transactionCategory: {
        type: String,
        enum: [
            'salary',
            'scholarship',
            'gifts',
            'other income',
            'groceries',
            'transport',
            'housing',
            'phone and internet',
            'entertainment',
            'clothing',
            'health',
            'education',
            'other expense',
        ],
        validate: {
            validator: function (value) {
                if (this.transactionType === false) {
                    return [
                        'groceries',
                        'transport',
                        'housing',
                        'phone and internet',
                        'entertainment',
                        'clothing',
                        'health',
                        'education',
                        'other expense',
                    ].includes(value)
                }
                return [
                    'salary',
                    'scholarship',
                    'gifts',
                    'other income',
                ].includes(value)
            },
            message: (props) =>
                `Категория "${props.value}" недопустима для данного типа транзакции.`,
        },
        required: false,
    },
})

export default mongoose.model('Transaction', TransactionSchema)
