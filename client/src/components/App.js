import { createContext, useState } from 'react'
import { useAuth } from '../hooks/auth.hook'
import AuthContext from '../context/auth.context'
import PageHolder from './PageHolder'

function App() {
    const { loading, isAuth, userData, login, createAccount, logout } = useAuth()

    return (
        <AuthContext.Provider value={{ loading, isAuth, userData, login, createAccount, logout }}>
            <div className="app">
                <div className="sidebar"></div>
                <h1 style={{ color: 'white' }} className="linked-text" onClick={logout}>
                    {String(isAuth)}
                </h1>
                <PageHolder />
            </div>
        </AuthContext.Provider>
    )
}

export default App

// todo
// navbar
