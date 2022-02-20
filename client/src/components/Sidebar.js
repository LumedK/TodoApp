import { useContext } from 'react'
import { AuthContext, AppContext } from '../context/app.context'
import SidebarItem from './SidebarItem'

const Sidebar = () => {
    const appContext = useContext(AppContext)
    const authContext = useContext(AuthContext)

    const menuList = new Map([
        ['spacer-top', { type: 'spacer', className: 'spacer-x05' }],
        // ['login', { title: 'Login / Create', iconName: '' }],
        [
            'todoPage',
            { title: 'Todo list', iconName: 'TodoIcon', onClickHandler: appContext.setCurrentPage }
        ],
        ['spacer-bot', { type: 'spacer', className: 'spacer' }],
        ['logout', { title: 'Logout', iconName: 'LogoutIcon', onClickHandler: authContext.logout }]
    ])

    if (!authContext.isAuth) return ''
    return (
        <div className="sidebar">
            {[...menuList.entries()].map((item) => {
                const [key, option] = item
                const { type, className } = option
                if (type === 'spacer') return <div key={key} className={className}></div>
                return <SidebarItem key={key} props={{ key, ...option }} />
            })}
        </div>
    )
}
export default Sidebar
