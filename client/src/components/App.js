import { createContext, useState } from 'react'
import { useAuth } from '../hooks/auth.hook'
import AuthContext from '../context/auth.context'
import PageHolder from './PageHolder'

function App() {
    const { loading, isAuth, userData } = useAuth()

    return (
        <AuthContext.Provider value={{ loading, isAuth, userData }}>
            <div className="app">
                <div className="sidebar"></div>
                <PageHolder />
            </div>
        </AuthContext.Provider>
    )
}

export default App
