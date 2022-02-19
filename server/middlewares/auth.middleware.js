const ApiError = require('../service/api-error.service')
const { validateAccessToken } = require('../service/token.service')

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const accessToken = authHeader.split(' ')[1]
        const userData = validateAccessToken(accessToken)
        if (!userData) {
            return next(ApiError.unauthorizedError())
        }
        req.user = userData
        next()
    } catch (error) {
        return next(ApiError.unauthorizedError())
    }
}
