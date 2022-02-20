import { useContext } from 'react'
import { AppContext } from '../context/app.context'
import { ReactComponent as TodoIcon } from '../assets/todo_icon.svg'
import { ReactComponent as LogoutIcon } from '../assets/logout_icon.svg'

const SidebarItem = (props) => {
    const appContext = useContext(AppContext)
    const { key, ...option } = props.props
    const Icon = {
        TodoIcon: <TodoIcon className="sb-item__icon" />,
        LogoutIcon: <LogoutIcon className="sb-item__icon" />
    }[option.iconName]

    const onClickHandler = (event) => {
        const id = event.target.id.replace('sb-item-id__', '')
        option.onClickHandler(id)
    }

    return (
        <div id={`sb-item-id__${key}`} className="sb-item" onClick={onClickHandler}>
            {Icon}
            <span className="sb-item__title">{option.title}</span>
        </div>
    )
}
export default SidebarItem
