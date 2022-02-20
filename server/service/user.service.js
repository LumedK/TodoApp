const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail.service')
const tokenService = require('./token.service')
const UserDto = require('../dtos/user.dto')
const ApiError = require('./api-error.service')

async function registration(email, password) {
    const candidate = await UserModel.findOne({ email })
    if (candidate) {
        throw ApiError.badRequest('User with this email already exists')
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const activationLink = uuid.v4()

    const newUser = await UserModel.create({ email, password: hashPassword, activationLink })
    await mailService.sendActivationMail(
        email,
        `${process.env.HOME_URL}/api/auth/activate/${activationLink}`
    )

    const userDto = new UserDto(newUser)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, ...userDto }
}

async function activate(activationLink) {
    const user = await UserModel.findOne({ activationLink })
    if (!user) {
        throw ApiError.badRequest('invalid activation link')
    }
    user.isActivated = true
    await user.save()
}

async function login(email, password) {
    const user = await UserModel.findOne({ email })
    if (!user) {
        throw ApiError.badRequest('incorrect email or password')
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password)
    if (!isPasswordEqual) {
        throw ApiError.badRequest('incorrect email or password')
    }

    const userDto = new UserDto(user)
    const tokens = await tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, ...userDto }
}

async function logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
}

async function refresh(refreshToken) {
    if (!refreshToken) {
        throw ApiError.unauthorizedError()
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDB = await tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDB) {
        throw ApiError.unauthorizedError()
    }
    const user = await UserModel.findById(userData.id)
    const userDto = new UserDto(user)
    const tokens = await tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, ...userDto }
}

async function test() {
    allUsers = await UserModel.find()
    return allUsers
}

module.exports = { registration, activate, login, logout, refresh, test }
