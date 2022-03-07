import { useState, useContext, useEffect } from 'react'
import { TodoManagerContext } from '../../context'

const TodoItem = (props) => {
    const todoManager = useContext(TodoManagerContext)
    const [todoItem, setTodoItem] = useState(props.todoItem)

    const onClickDeleteItem = () => {
        todoManager.deleteTodoItem(todoItem.todoListID, todoItem.id)
        setTodoItem()
    }

    if (!todoItem) return ''
    return (
        <div className="list-card">
            <input type="checkbox" />
            <div className="list-card__title">{todoItem.title}</div>
            <div className="linked-text" onClick={onClickDeleteItem}>
                Delete
            </div>
        </div>
    )
}
export default TodoItem
