import http from './http.manager'

class ServiceResponse {
    constructor() {
        this.errors = []
        this.userData = {
            id: undefined,
            email: undefined,
            isActivated: false,
            activationLink: undefined
        }
    }
    setUserData(data = {}) {
        const { id, email, isActivated = false, activationLink } = data
        this.userData = { id, email, isActivated, activationLink }
        return this
    }
    validationError(field, message) {
        this.errors.push({ field, message, type: 'validationError' })
        return this
    }
    unexpectedError(message) {
        this.errors.push({ field: undefined, message, type: 'unexpectedError' })
        return this
    }
}

export async function updateToken() {
    const data = await getTokenData()
    if (data) {
        localStorage.setItem('todo-auth-token', data.accessToken)
        return true
    }
    return false
}

async function getTokenData() {
    const httpRes = await http('api/auth/refresh', {}, false)
    if (httpRes && httpRes.ok) {
        return httpRes.data
    }
    return undefined
}

export async function loginByToken() {
    const tokenData = await getTokenData()
    return new ServiceResponse().setUserData(tokenData)
}

export async function login(email, password) {
    const serviceResponse = new ServiceResponse()
    try {
        if (!email) serviceResponse.validationError('email', 'Incorrect email or password')
        if (!password) serviceResponse.validationError('password', 'Incorrect email or password')
        if (serviceResponse.errors.length) return serviceResponse

        const httpRes = await http('/api/auth/login', {
            body: { email: email.toLowerCase(), password }
        })
        if (httpRes.ok && !httpRes.data.isActivated) {
            serviceResponse.validationError('email', 'Activate your account')
        } else if (httpRes.ok) {
            serviceResponse.setUserData(httpRes.data)
        } else if (httpRes.data.message === 'incorrect email or password') {
            serviceResponse.validationError('email', 'User with this email already exists')
        } else {
            throw new Error(httpRes.data.message)
        }
        if (serviceResponse.errors.length === 0) {
            localStorage.setItem('todo-auth-token', httpRes.data.accessToken)
        }
    } catch (error) {
        return serviceResponse.unexpectedError(error.message)
    }
    return serviceResponse
}

export async function createAccount(email, password) {
    const serviceResponse = new ServiceResponse()
    try {
        if (!email) serviceResponse.validationError('email', 'Incorrect email or password')
        if (!password) serviceResponse.validationError('password', 'Incorrect email or password')
        if (serviceResponse.errors.length) return serviceResponse

        const httpRes = await http('/api/auth/registration', {
            body: { email: email.toLowerCase(), password }
        })
        if (httpRes.ok && !httpRes.data.isActivated) {
            serviceResponse.validationError('email', 'Activate your account')
        } else if (httpRes.ok) {
            serviceResponse.setUserData(httpRes.data)
        } else if (httpRes.data.message === 'User with this email already exists') {
            serviceResponse.validationError('email', 'User with this email already exists')
        } else {
            throw new Error(httpRes.data.message)
        }
        if (serviceResponse.errors.length === 0) {
            localStorage.setItem('todo-auth-token', httpRes.data.accessToken)
        }
    } catch (error) {
        return serviceResponse.unexpectedError(error.message)
    }
    return serviceResponse
}

export async function logout() {
    await http('/api/auth/logout', { method: 'POST' })
    localStorage.removeItem('todo-auth-token')
}
