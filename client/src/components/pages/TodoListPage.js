import { useCallback, useContext, useEffect, useState, useRef } from 'react'
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

    const titleRef = useRef()
    const isModified = useRef()

    useEffect(() => {
        setTodoItemsList(getTodoItemsList())
        checkTitleHeight()
        isModified.current = false
    }, [todoManager.todoItems, getTodoItemsList])

    const onClickAddTodoItem = async () => {
        await todoManager.updateTodoItem(todoListID)
    }

    const checkTitleHeight = () => {
        titleRef.current.rows = 1
        while (titleRef.current.scrollHeight > titleRef.current.clientHeight) {
            titleRef.current.rows++
        }
    }

    const onBlurPageTitle = async (event) => {
        if (!isModified.current) return
        isModified.current = false
        await todoManager.updateTodoList(todoListID, todoList)
    }
    const onChangeListTitle = (event) => {
        isModified.current = true
        checkTitleHeight()

        setTodoList((prevTodoList) => {
            prevTodoList.title = event.target.value
            return { ...prevTodoList }
        })
    }

    return (
        <div className="page">
            <textarea
                ref={titleRef}
                className="page__title text-input"
                type="text"
                placeholder="Enter the name of the todo list ..."
                value={todoList.title}
                onBlur={onBlurPageTitle}
                onChange={onChangeListTitle}
                rows={1}
            />

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
