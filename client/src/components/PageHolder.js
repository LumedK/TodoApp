import { useContext } from 'react'
import { AppContext } from '../context/app.context'
import LoginPage from './LoginPage'
import TodoPage from './TodoPage'

function PageHolder() {
    const appContext = useContext(AppContext)
    const pages = new Map([
        ['todoPage', <TodoPage />],
        ['loginPage', <LoginPage />]
    ])

    return <div className="page-holder">{pages.get(appContext.currentPage)}</div>
}

export default PageHolder
