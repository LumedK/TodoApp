import { useState, useMemo } from 'react'
import { useAuth } from '../hooks/auth.hook'
import { AuthContext, AppContext } from '../context/app.context'
import PageHolder from './PageHolder'
import Sidebar from './Sidebar'
import Loader from './Loader'

function App() {
    const { loading, isAuth = false, userData, login, createAccount, logout } = useAuth()
    const [currentPage, setCurrentPage] = useState(isAuth ? 'todoPage' : 'loginPage')

    useMemo(() => {
        if (!loading) setCurrentPage(isAuth ? 'todoPage' : 'loginPage')
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
