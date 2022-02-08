import { useState, useContext } from 'react'
import { TodoManagerContext } from '../context/todoManager.context'
import { setModifiers } from '../common/component.common'

function TodoItem(props) {
    const { todo } = props
    const { deleteTodo, updateTodo } = useContext(TodoManagerContext)
    const [completed, setCompleted] = useState(todo.completed)
    const [readOnly, setReadOnly] = useState(true)
    const [title, setTitle] = useState(todo.title)

    const checkboxHandler = () => {
        todo.completed = !todo.completed
        updateTodo(todo)
        setCompleted(todo.completed)
    }
    const titleOnChangeHandler = (event) => {
        setTitle(event.target.value)
    }
    const titleOnBlurHandler = () => {
        updateTodo(todo)
    }
    const deleteHandler = () => {
        deleteTodo(todo.id)
    }

    return (
        <div className="todo-item" id={todo.id}>
            <div className="item-header-line">
                <div className="item-header-line__left">
                    <input
                        className="item-checkbox"
                        type="checkbox"
                        disabled={readOnly}
                        checked={completed}
                        onChange={checkboxHandler}
                    />
                    <input
                        className={setModifiers('item-title', { completed })}
                        type="text"
                        placeholder="Enter the title"
                        readOnly={readOnly}
                        onChange={titleOnChangeHandler}
                        onBlur={titleOnBlurHandler}
                        value={title}
                        autoFocus
                    />
                    <button className="">edit</button>
                </div>
                <div className="item-header-line__right">
                    <button className="options__menu" onClick={deleteHandler}>
                        delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TodoItem
