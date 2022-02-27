import { ReactComponent as TodoIcon } from '../../assets/todo_icon.svg'
import { ReactComponent as LogoutIcon } from '../../assets/logout_icon.svg'

const SidebarItem = (props) => {
    const { key, ...option } = props.props
    const Icon = {
        TodoIcon: <TodoIcon className="sb-item__icon" />,
        LogoutIcon: <LogoutIcon className="sb-item__icon" />
    }[option.iconName]

    return (
        <div
            className="sb-item"
            onClick={() => {
                option.onClickHandler(key)
            }}
        >
            {Icon}
            <span className="sb-item__title">{option.title}</span>
        </div>
    )
}
export default SidebarItem
