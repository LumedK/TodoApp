import { useState } from 'react'

function TodoItem(props) {
    const { todoItem } = props
    let [done, setCompleted] = useState(todoItem.done)

    function checkboxHandler() {
        todoItem.done = !todoItem.done
        setCompleted(todoItem.done)
    }

    return (
        <div className="todo-item">
            <div className="todo-item__header">
                <label>
                    <div className="checkbox">
                        <input
                            id={todoItem.id}
                            type="checkbox"
                            checked={done}
                            onChange={checkboxHandler}
                        />
                    </div>
                    <div className={'todo-item__title' + (done ? ' todo-item__title--done' : '')}>
                        {todoItem.title}
                    </div>
                </label>
            </div>
        </div>
    )
}

export default TodoItem
