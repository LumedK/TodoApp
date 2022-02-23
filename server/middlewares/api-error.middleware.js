const ApiError = require('../service/api-error.service')

const ErrorHandler = (error, req, res, next) => {
    if (error instanceof ApiError) {
        return res.status(error.status).json({ message: error.message, errors: error.errors })
    }
    return res.status(500).json({ message: 'Unexpected error', errors: [error.message] })
}

module.exports = ErrorHandler
