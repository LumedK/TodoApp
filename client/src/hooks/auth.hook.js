import { useCallback, useEffect, useState } from 'react'
import { loginByToken } from '../services/auth.service'
import {
    login as serviceLogin,
    logout as serviceLogout,
    createAccount as serviceCreateAccount
} from '../services/auth.service'

export const useAuth = () => {
    const [loading, setLoading] = useState(true)
    const [isAuth, setAuth] = useState(false)
    const [userData, setUserData] = useState({})

    const initiate = useCallback(async () => {
        setLoading(true)
        const tokenData = await loginByToken()
        const newUserData = tokenData.userData
        if (newUserData && newUserData.isActivated) {
            setAuth(true)
            setUserData(newUserData)
        }
        setLoading(false)
    }, [])

    const login = async (email, password) => {
        const serviceResponse = await serviceLogin(email, password)
        if (!serviceResponse.errors.length) {
            setAuth(true)
            setUserData(serviceResponse.userData)
        }
        return serviceResponse.errors
    }
    const createAccount = async (email, password) => {
        const serviceResponse = await serviceCreateAccount(email, password)
        if (!serviceResponse.errors.length) {
            setAuth(true)
            setUserData(serviceResponse.userData)
        }
        return serviceResponse.errors
    }
    const logout = async () => {
        if (!isAuth) return
        setLoading(true)
        await serviceLogout()
        setAuth(false)
        setUserData({})
        setLoading(false)
    }

    useEffect(() => {
        initiate()
    }, [initiate])

    return { loading, isAuth, userData, login, createAccount, logout }
}
