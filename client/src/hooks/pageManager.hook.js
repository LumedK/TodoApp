import { useState } from 'react'
// icons
import { ReactComponent as iconTodo } from '../assets/todo_icon.svg'
import { ReactComponent as iconLogout } from '../assets/logout_icon.svg'
// pages
import LoginPage from '../components/Pages/LoginPage/LoginPage'
import AllLists from '../components/Pages/AllTodoListsPage/AllTodoListsPage'
import TodoListPage from '../components/Pages/TodoListPage/TodoListPage'
import Page1 from '../components/Page1'

const handlers = new Map([['logout', () => {}]])

const pages = new Map([
    ['spacer-top', { type: 'spacer', className: 'spacer-x05' }],
    ['login', { navTitle: 'Login', icon: iconTodo, component: LoginPage }],
    ['allTodoLists', { navTitle: 'All todo lists', icon: iconTodo, component: AllLists }],
    ['page1', { navTitle: 'Page 1', icon: iconTodo, component: Page1 }],
    ['spacer-bottom', { type: 'spacer', className: 'spacer' }],
    [
        'logout',
        { navTitle: 'Logout', handlerName: 'logout', icon: iconLogout, component: LoginPage }
    ],
    ['todoListPage', { type: 'hidden', component: TodoListPage }]
])

let componentProps

export const usePageManager = () => {
    const [currentPage, setCurrentPage] = useState('login')
    const getComponent = (pageName) => {
        return pages.get(pageName).component
    }
    const getComponentProps = () => {
        return componentProps
    }
    const openPage = (pageName, pageProps) => {
        componentProps = pageProps
        setCurrentPage(pageName)
    }
    const getPages = () => {
        return pages
    }
    const addHandler = (handlerName, callback) => {
        handlers.set(handlerName, callback)
    }
    const runHandler = (handlerName, props) => {
        handlers.get(handlerName)(props)
    }

    return {
        currentPage,
        openPage,
        getPages,
        getComponent,
        getComponentProps,
        addHandler,
        runHandler
    }
}
