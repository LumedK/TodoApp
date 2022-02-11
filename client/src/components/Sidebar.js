import UserAvatar from './UserAvatar'
import SidebarMenuItem from './SidebarMenuItem'

import { ReactComponent as MenuTodos } from '../assets/menu-todos.svg'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-context">
                <div className="sidebar-header">
                    <div className="user-ava">L</div>
                    <div className="user-name">Lumed</div>
                </div>
                <div className="sidebar-menu__item">
                    <MenuTodos className="menu-item__icon" />
                    <span className="menu-item__title">Todo list</span>
                </div>
                <div className="sidebar-menu__item">
                    <MenuTodos className="menu-item__icon" />
                    <span className="menu-item__title">Todo list</span>
                </div>
                <div className="sidebar-menu__item">
                    <MenuTodos className="menu-item__icon" />
                    <div className="menu-item__title">Todo list</div>
                </div>
            </div>

            {/* <div className="sb-user-item">
                <UserAvatar />
                <span className="sb-user-item__username">{'Lumed'}</span>
            </div>
            <SidebarMenuItem />
            <SidebarMenuItem />
            <SidebarMenuItem />
            <SidebarMenuItem />
            <SidebarMenuItem /> */}
        </div>
    )
}

export default Sidebar
