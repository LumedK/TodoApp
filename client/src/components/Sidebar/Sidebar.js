import { useContext } from 'react'
import { AuthContext, PageManagerContext } from '../../context'
import SidebarItem from './SidebarItem'

const Sidebar = () => {
    const pageManagerContext = useContext(PageManagerContext)
    const authContext = useContext(AuthContext)

    if (!authContext.isAuth) return ''

    return (
        <div className="sidebar">
            {[...pageManagerContext.getPages().entries()].map((item) => {
                const [key, options] = item
                if (options.type === 'hidden') return ''
                if (options.type === 'spacer')
                    return <div key={key} className={options.className}></div>
                return <SidebarItem key={key} props={{ key, options }} />
            })}
        </div>
    )
}
export default Sidebar
