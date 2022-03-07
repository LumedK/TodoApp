import { useCallback, useContext, useEffect, useState } from 'react'
import { TodoManagerContext } from '../../context'
import TodoItem from '../todoComponents/TodoItem'

function TodoListPage(props) {
    const todoListID = props.props.id
    const todoManager = useContext(TodoManagerContext)

    const getTodoList = () => todoManager.todoLists.find((list) => list.id === todoListID)
    const getTodoItemsList = useCallback(
        () => todoManager.todoItems.filter((item) => item.todoListID === todoListID),
        [todoManager.todoItems, todoListID]
    )

    const [todoList, setTodoList] = useState(getTodoList())
    const [todoItemsList, setTodoItemsList] = useState(getTodoItemsList())

    const onClickAddTodoItem = async () => {
        await todoManager.updateTodoItem(todoListID)
    }

    useEffect(() => {
        setTodoItemsList(getTodoItemsList())
    }, [todoManager.todoItems, getTodoItemsList])

    return (
        <div className="page">
            <div className="page__title">{todoList.title}</div>
            <div className="list-holder">
                <div className="sticky-holder--add-button">
                    <div className="add-button" onClick={onClickAddTodoItem}></div>
                </div>
                {todoItemsList.map((todoItem) => {
                    return <TodoItem key={todoItem.id} todoItem={todoItem} />
                })}
            </div>
        </div>
    )
}

export default TodoListPage
