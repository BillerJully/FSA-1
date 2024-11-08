import User from '../models/User.js'
import bcrypt, { hash } from 'bcrypt'
import TokenService from './tokenService.js'
import UserDto from '../dto/UserDto.js'
import ApiError from '../exceptions/apiError.js'

class UserService {
    async register({ username, password }) {
        const candidate = await User.findOne({ username })
        if (candidate) {
            throw ApiError.BadRequest(`Already have ${username} user`)
        }
        const hashPassword = await bcrypt.hash(password, 7)
        const user = await User.create({ username, password: hashPassword })
        const userDto = new UserDto(user)
        const tokens = TokenService.generateToken({ ...userDto })
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto,
        }
    }
    async login({ username, password }) {
        const user = await User.findOne({ username })
        if (!user) {
            throw ApiError.BadRequest('User not found!')
        }
        const isPasswordEquals = await bcrypt.compare(password, user.password)
        if (!isPasswordEquals) {
            throw ApiError.BadRequest('User data not correct!')
        }

        const userDto = new UserDto(user)
        const tokens = TokenService.generateToken({ ...userDto })
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto,
        }
    }
    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = TokenService.validateRefreshToken(refreshToken)
        const dbToken = await TokenService.findToken(refreshToken)
        if (!userData || !dbToken) {
            throw ApiError.UnauthorizedError()
        }
        const user = await User.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = TokenService.generateToken({ ...userDto })
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto,
        }
    }

    async getAllUsers() {
        const users = await User.find()
        return users
    }
}

export default new UserService()
