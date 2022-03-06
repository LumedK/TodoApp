import { useState } from 'react'
import { useTodoManager } from '../../../hooks/useTodoManager'

const TodoItem = (props) => {
    const [todoItem, setTodoItem] = useState(props?.todoItem)
    const todoManager = useTodoManager({ todoListID: todoItem?.todoListID })

    const deleteTodoItem = () => {
        todoManager.deleteTodoItem(todoItem.todoListID, todoItem.id)
        setTodoItem(undefined)
    }

    if (!todoItem) return ''
    return (
        <div className="list-card">
            <input type="checkbox" />
            <div className="list-card__title">{todoItem.title + todoManager.todoItems?.length}</div>
            <div className="linked-text" onClick={deleteTodoItem}>
                Delete
            </div>
        </div>
    )
}
export default TodoItem
