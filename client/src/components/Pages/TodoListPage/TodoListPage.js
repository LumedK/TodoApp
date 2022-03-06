import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context'
import { useTodoManager } from '../../../hooks/useTodoManager'
import Loader from '../../Loader'
import TodoItem from './TodoItem'

function TodoListPage(props) {
    const { id: todoListID } = props.props
    const todoManager = useTodoManager({ todoListID })

    if (!todoManager.todoList || !todoManager.todoItems) return <Loader />
    return (
        <div className="page">
            <div className="page__title">{todoManager.todoList.title}</div>
            <div className="list-holder">
                <div className="sticky-holder--add-button">
                    <div
                        className="add-button"
                        onClick={() => {
                            todoManager.updateTodoItem(todoListID)
                        }}
                    ></div>
                </div>
                {todoManager.todoItems.map((todoItem) => {
                    return <TodoItem key={todoItem.id} todoItem={todoItem} />
                })}
            </div>
        </div>
    )
}

export default TodoListPage
