const userService = require('../service/user.service')
const { validationResult } = require('express-validator')
const ApiError = require('../service/api-error.service')

class AuthController {
    registration = async (req, res, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation error', errors.array()))
            }

            const { email, password } = req.body
            const userData = await userService.registration(email, password)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    logout = async (req, res, next) => {
        try {
            const { refreshToken } = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (error) {
            next(error)
        }
    }

    activate = async (req, res, next) => {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (error) {
            next(error)
        }
    }

    refresh = async (req, res, next) => {
        try {
            const { refreshToken } = req.cookies
            res.clearCookie('refreshToken')
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    test = async (req, res, next) => {
        try {
            const allUsers = await userService.test()
            res.json(allUsers)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AuthController()
