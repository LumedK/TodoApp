import { useState, useMemo } from 'react'
import { useAuth } from '../hooks/auth.hook'
import { AuthContext, AppContext } from '../context/app.context'
import PageHolder from './PageHolder'
import Sidebar from './Sidebar'
import Loader from './Loader'

import { useTodos } from '../hooks/todo.hook'

function App() {
    const { loading, isAuth = false, userData, login, createAccount, logout } = useAuth()
    const [currentPage, setCurrentPage] = useState(isAuth ? 'allLists' : 'loginPage')
    useTodos(userData.id)

    useMemo(() => {
        if (!loading) setCurrentPage(isAuth ? 'allLists' : 'loginPage')
    }, [isAuth, loading])

    if (loading) return <Loader />
    return (
        <AppContext.Provider value={{ currentPage, setCurrentPage }}>
            <AuthContext.Provider
                value={{ loading, isAuth, userData, login, createAccount, logout }}
            >
                <div className="app">
                    <Sidebar />
                    <PageHolder />
                </div>
            </AuthContext.Provider>
        </AppContext.Provider>
    )
}

export default App
