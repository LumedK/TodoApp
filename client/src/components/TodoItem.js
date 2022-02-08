import { useState, useContext } from 'react'
import { TodoContext } from '../context/TodoContext'

function TodoItem(props) {
    const { todoItem } = props
    const todoManager = useContext(TodoContext)
    const [completed, setCompleted] = useState(todoItem.completed)
    const [edited, setEdited] = useState(false)
    const [title, setTitle] = useState(todoItem.title)

    function checkboxHandler() {
        todoItem.completed = !todoItem.completed
        setCompleted(todoItem.completed)
    }

    function setClasses(className, modifiers) {
        const classList = [className]
        for (const prop in modifiers) {
            if (modifiers.hasOwnProperty(prop) && modifiers[prop]) {
                classList.push(className + '--' + prop)
            }
        }
        return classList.join(' ')
    }

    function deleteTodo() {
        todoManager.deleteTodo(todoItem.id)
    }

    function editTodo() {
        if (edited) setEdited(null)
        else setEdited(todoItem.id)
    }

    function blurHandle() {
        console.log('onBlur')
    }

    function handleTitleChange(event) {
        setTitle(event.target.value)
    }

    return (
        <div className="todo-item">
            <div className="item-header-line">
                <div className="item-header-line__left">
                    <label className="item-checkbox">
                        <div className="item-checkbox__input">
                            <input
                                id={todoItem.id}
                                type="checkbox"
                                disabled={edited}
                                checked={completed}
                                onChange={checkboxHandler}
                            />
                        </div>
                        <input
                            className={setClasses('item-checkbox__title', { completed })}
                            type="text"
                            placeholder="Enter the title"
                            readOnly={!edited}
                            onChange={handleTitleChange}
                            value={title}
                            autoFocus
                        />
                    </label>
                </div>
                <div className="item-header-line__right">
                    <div className="options">
                        <button
                            className={'options__menu ' + setClasses('btn', { pressed: edited })}
                            onClick={editTodo}
                        >
                            edit
                        </button>
                        <button className="options__menu" onClick={deleteTodo}>
                            delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoItem
