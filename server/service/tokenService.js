import jwt from 'jsonwebtoken'
import Token from '../models/Token.js'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_ACCESS_SECRET

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '10m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '1d',
        })
        return { accessToken, refreshToken }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (error) {
            return null
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (error) {
            return null
        }
    }
    async saveToken(username, refreshToken) {
        const tokenData = await Token.findOne({ user: username })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await Token.create({ user: username, refreshToken })
        return token
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.deleteOne({ refreshToken })
        return tokenData
    }

    async findToken(refreshToken) {
        const tokenData = await Token.findOne({ refreshToken })
        return tokenData
    }
}

export default new TokenService()
