import { useContext } from 'react'
import { PageManagerContext } from '../../context'

const SidebarItem = (props) => {
    const pageManager = useContext(PageManagerContext)
    const { key, options } = props.props
    const Icon = options.icon

    const onClickHandler = () => {
        if (options.handlerName) pageManager.runHandler(options.handlerName)
        pageManager.openPage(key)
    }

    return (
        <div className="sb-item" onClick={onClickHandler}>
            <Icon className="sb-item__icon" />
            <span className="sb-item__title">{options.navTitle}</span>
        </div>
    )
}

export default SidebarItem
