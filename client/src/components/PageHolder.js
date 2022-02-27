import { useContext } from 'react'
import { CurrentPageContext } from '../context'
import LoginPage from './Pages/LoginPage/Page'
import AllTodoLists from './Pages/AllTodoListsPage/Page'

function PageHolder() {
    const currentPageContext = useContext(CurrentPageContext)
    const pages = new Map([
        ['allTodoLists', <AllTodoLists />],
        ['loginPage', <LoginPage />]
    ])

    return <div className="page-holder">{pages.get(currentPageContext.currentPage)}</div>
}

export default PageHolder
