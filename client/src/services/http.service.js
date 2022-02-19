export default async function http(url, options = {}) {
    const result = { error: undefined, response: undefined }
    try {
        let { method = '', body = undefined, headers = {} } = options
        if (body) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(body)
        } else {
            method = method || 'GET'
        }
        result.response = await fetch(url, { method, headers, body })
    } catch (error) {
        result.error.push()
    }
    return result
}
