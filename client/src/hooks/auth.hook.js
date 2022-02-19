import { useCallback, useEffect, useState } from 'react'
import { loginByToken } from '../services/auth.service'

export const useAuth = () => {
    const [loading, setLoading] = useState(true)
    const [isAuth, setAuth] = useState(false)
    let userData = undefined

    const initiate = useCallback(async () => {
        setLoading(true)
        console.log('super heavy')
        userData = await loginByToken()
        setAuth(Boolean(userData) && userData.isActivated)
        setLoading(false)
    }, [])

    useEffect(() => {
        initiate()
    }, [initiate])

    return { loading, isAuth, userData }
}
