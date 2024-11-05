import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

// UserSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next()
//     this.password = await bcrypt.hash(this.password, 7)
//     next()
// })

// UserSchema.methods.isValidPassword = async function (password) {
//     return await bcrypt.compare(password, this.password)
// }

export default mongoose.model('User', UserSchema)
