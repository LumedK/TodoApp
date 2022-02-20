import { useCallback, useEffect, useState } from 'react'
import { loginByToken } from '../services/auth.service'
import {
    login as serviceLogin,
    logout as serviceLogout,
    createAccount as serviceCreateAccount
} from '../services/auth.service'

export const useAuth = () => {
    console.log(1)
    const [loading, setLoading] = useState(true)
    const [isAuth, setAuth] = useState(false)
    const [userData, setUserData] = useState({})

    const initiate = useCallback(async () => {
        console.log('heavy1')
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
        await serviceLogout()
        setAuth(false)
        setUserData({})
    }

    // useEffect(() => {
    //     console.log('heavy')
    //     // setLoading(true)
    //     // const tokenData = await loginByToken()
    //     // const newUserData = tokenData.userData
    //     // if (newUserData && newUserData.isActivated) {
    //     //     // setAuth(true)
    //     //     // setUserData(newUserData)
    //     // }
    //     // setLoading(false)
    // }, [])
    useEffect(() => {
        console.log('heavy2')
        initiate()
    }, [initiate])

    return { loading, isAuth, userData, login, createAccount, logout }
}
