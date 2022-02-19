import { updateToken } from './auth.service'

export default async function http(url, options = {}, refreshToken = true) {
    try {
        let { method = '', body = undefined, headers = {} } = options
        headers['Authorization'] = `Bearer ${localStorage.getItem('todo-auth-token')}`

        if (body) {
            headers['Content-Type'] = 'application/json'
            method = method || 'POST'
            body = JSON.stringify(body)
        } else {
            method = method || 'GET'
        }
        let response = await fetch(url, { method, headers, body })

        //update access token
        if (refreshToken && response.status === 401 && updateToken()) {
            headers['Authorization'] = `Bearer ${localStorage.getItem('todo-auth-token')}`
            response = await fetch(url, { method, headers, body })
        }

        const data = await response.json()
        const ok = response.ok

        return { ok, data, response }
    } catch (error) {
        console.log(error)
        return null
    }
}
