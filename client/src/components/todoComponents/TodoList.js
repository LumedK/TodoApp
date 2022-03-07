import { useContext } from 'react'
import { TodoManagerContext, PageManagerContext } from '../../context'

const TodoList = (props) => {
    const { todoList } = props
    const pageManager = useContext(PageManagerContext)
    const todoManager = useContext(TodoManagerContext)

    const OnClickOpen = () => {
        pageManager.openPage('todoListPage', { id: todoList.id })
    }

    const OnClickDelete = () => {
        todoManager.deleteTodoList(todoList.id)
    }

    return (
        <div className="list-card">
            <div className="list-card__title">{todoList.title}</div>
            <div className="linked-text" onClick={OnClickOpen}>
                Open
            </div>
            <div> | </div>
            <div className="linked-text" onClick={OnClickDelete}>
                Delete
            </div>
        </div>
    )
}
export default TodoList
