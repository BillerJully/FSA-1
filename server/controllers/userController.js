import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import UserService from '../service/userService.js'
import { validationResult } from 'express-validator'
import ApiError from '../exceptions/apiError.js'
import userService from '../service/userService.js'

dotenv.config()

const JWT_SECRET = process.env.JWT_ACCESS_SECRET

class UserController {
    async register(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest('Bad validation', errors.array())
                )
            }
            const { username, password } = req.body
            const userData = await UserService.register({ username, password })
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
            })
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (error) {
            next(error)
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userData = await UserService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
            })
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
    async delete(req, res) {
        try {
        } catch (error) {}
    }
    async login(req, res, next) {
        try {
            const { username, password } = req.body
            const userData = await UserService.login({ username, password })
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
            })
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
    async getAllUsers(req, res, next) {
        try {
            const users = await UserService.getAllUsers()
            return res.json(users)
        } catch (error) {
            next(error)
        }
    }
}

export default new UserController()
