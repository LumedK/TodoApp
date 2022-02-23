const jwt = require('jsonwebtoken')
const TokenModel = require('../models/token.model')

async function generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '1d' })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
    return { accessToken, refreshToken }
}

async function saveToken(userID, refreshToken) {
    const tokenData = await TokenModel.findOne({ userID })
    if (tokenData) {
        tokenData.refreshToken = refreshToken
        return tokenData.save()
    }
    const token = await TokenModel.create({ userID, refreshToken })
    return token
}

async function removeToken(token) {
    const tokenData = await TokenModel.deleteOne({ token })
    return tokenData
}

async function findToken(token) {
    const tokenData = await TokenModel.findOne({ token })
    return tokenData
}

function validateAccessToken(token) {
    try {
        const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        return userData
    } catch (error) {
        return null
    }
}

function validateRefreshToken(token) {
    try {
        const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        return userData
    } catch (error) {
        return null
    }
}

module.exports = {
    generateTokens,
    saveToken,
    removeToken,
    validateRefreshToken,
    validateAccessToken,
    findToken
}
