import { useState, useMemo } from 'react'
import { useAuth } from '../hooks/auth.hook'
import { AuthContext, CurrentPageContext } from '../context'
import PageHolder from './PageHolder'
import Sidebar from './Sidebar/Sidebar'
import Loader from './Loader'

function App() {
    const { loading, isAuth = false, userData, login, createAccount, logout } = useAuth()
    const [currentPage, setCurrentPage] = useState(isAuth ? 'allTodoLists' : 'loginPage')

    useMemo(() => {
        if (!loading) setCurrentPage(isAuth ? 'allTodoLists' : 'loginPage')
    }, [isAuth, loading])

    if (loading) return <Loader />
    return (
        <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
            <AuthContext.Provider
                value={{ loading, isAuth, userData, login, createAccount, logout }}
            >
                <div className="app">
                    <Sidebar />
                    <PageHolder />
                </div>
            </AuthContext.Provider>
        </CurrentPageContext.Provider>
    )
}

export default App
