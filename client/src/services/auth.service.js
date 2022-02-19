import http from './http.service'

export function getUserData(data) {
    if (!data) return undefined
    const { id, email, isActivated, activationLink } = data
    return { id, email, isActivated, activationLink }
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
    return getUserData(await getTokenData())
}

export async function login(email, password) {
    if (!email || !password) return undefined
    const httpRes = await http('/api/auth/login', {
        body: { email: email.toLowerCase(), password }
    })
    if (!httpRes || !httpRes.ok) return undefined

    localStorage.setItem('todo-auth-token', httpRes.data.accessToken)

    return getUserData(httpRes.data)
}

export async function createAccount(email, password) {
    if (!email || !password) return undefined
    const httpRes = await http('/api/auth/registration', {
        body: { email: email.toLowerCase(), password }
    })
    if (!httpRes || !httpRes.ok) return undefined

    localStorage.setItem('todo-auth-token', httpRes.data.accessToken)

    return getUserData(httpRes.data)
}

export async function logout() {
    localStorage.removeItem('todo-auth-token')
    return getUserData()
}
