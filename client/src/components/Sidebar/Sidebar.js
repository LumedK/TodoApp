import { useContext } from 'react'
import { AuthContext, CurrentPageContext } from '../../context'
import SidebarItem from './SidebarItem'

const Sidebar = () => {
    const currentPageContext = useContext(CurrentPageContext)
    const authContext = useContext(AuthContext)

    const menuMap = new Map()
    menuMap.set('spacer-top', { type: 'spacer', className: 'spacer-x05' })
    menuMap.set('allTodoLists', {
        title: 'All todo lists',
        iconName: 'TodoIcon',
        onClickHandler: currentPageContext.setCurrentPage
    })
    menuMap.set('spacer-bot', { type: 'spacer', className: 'spacer' })
    menuMap.set('logout', {
        title: 'Logout',
        iconName: 'LogoutIcon',
        onClickHandler: authContext.logout
    })

    if (!authContext.isAuth) return ''
    return (
        <div className="sidebar">
            {[...menuMap.entries()].map((item) => {
                const [key, option] = item
                const { type, className } = option
                if (type === 'spacer') return <div key={key} className={className}></div>
                return <SidebarItem key={key} props={{ key, ...option }} />
            })}
        </div>
    )
}
export default Sidebar
