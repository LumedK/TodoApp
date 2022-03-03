import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { usePageManager } from '../hooks/usePages'
import { AuthContext, PageManagerContext } from '../context'
import PageHolder from './PageHolder'
import Sidebar from './Sidebar/Sidebar'
import Loader from './Loader'

function App() {
    const { loading, isAuth = false, userData, login, createAccount, logout } = useAuth()
    const pageManager = usePageManager()

    useEffect(() => {
        if (loading) return
        else if (!isAuth) pageManager.openPage('login')
        else if (isAuth) {
            pageManager.addHandler('logout', logout)
            pageManager.openPage('allTodoLists')
        }
    }, [loading, isAuth]) // eslint-disable-line

    if (loading) return <Loader />
    return (
        <PageManagerContext.Provider value={pageManager}>
            <AuthContext.Provider
                value={{ loading, isAuth, userData, login, createAccount, logout }}
            >
                <div className="app">
                    <Sidebar />
                    <PageHolder />
                </div>
            </AuthContext.Provider>
        </PageManagerContext.Provider>
    )
}

export default App
