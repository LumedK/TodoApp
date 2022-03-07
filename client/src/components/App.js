import { useEffect } from 'react'
import { useAuth } from '../hooks/initiateAuth.hook'
import { usePageManager } from '../hooks/initiatePageManager.hook'
import { useTodoManager } from '../hooks/initiateTodoManager.hook'
import { AuthContext, PageManagerContext, TodoManagerContext } from '../context'
import PageHolder from './PageHolder'
import Sidebar from './sidebar/Sidebar'
import Loader from './Loader'

function App() {
    const auth = useAuth()
    const pageManager = usePageManager()
    const todoManager = useTodoManager(auth.userData.id)

    useEffect(() => {
        pageManager.addHandler('logout', auth.logout)
        if (auth.isAuth) {
            pageManager.openPage('allTodoLists')
        } else {
            pageManager.openPage('login')
        }
    }, [auth.isAuth]) // eslint-disable-line

    if (auth.loading) return <Loader />
    return (
        <AuthContext.Provider value={auth}>
            <PageManagerContext.Provider value={pageManager}>
                <TodoManagerContext.Provider value={todoManager}>
                    <div className="app">
                        <Sidebar />
                        <PageHolder />
                    </div>
                </TodoManagerContext.Provider>
            </PageManagerContext.Provider>
        </AuthContext.Provider>
    )
}

export default App
