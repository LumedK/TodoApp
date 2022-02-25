import { useContext } from 'react'
import { AppContext } from '../context/app.context'
import LoginPage from './LoginPage'
import AllLists from './AllListPage'
// import TodoPage from './TodoPage'

function PageHolder() {
    const appContext = useContext(AppContext)
    const pages = new Map([
        ['allLists', <AllLists />],
        ['loginPage', <LoginPage />]
    ])

    return <div className="page-holder">{pages.get(appContext.currentPage)}</div>
}

export default PageHolder
