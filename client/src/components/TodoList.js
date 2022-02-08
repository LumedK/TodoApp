// import { useState, useEffect, useCallback, useContext } from 'react'
// import Loader from './Loader'
// import TodoItem from './TodoItem'

import { useTodoManager } from '../hooks/todo.hook'
import { TodoContext } from '../context/TodoContext'
import Loader from './Loader'
import TodoItem from './TodoItem'

function TodoList() {
    const { loaded, todoList, setTodoList, addTodo, deleteTodo } = useTodoManager()

    if (!loaded) {
        return <Loader />
    }
    return (
        <TodoContext.Provider value={{ addTodo, deleteTodo }}>
            <div className="todo-list">
                <h1 className="todo-list-header">Todo list</h1>
                {todoList.map((todoItem) => {
                    return <TodoItem todoItem={todoItem} key={todoItem.id} />
                })}
                <button className="btn-add-todo" type="button" onClick={addTodo}>
                    add
                </button>
            </div>
        </TodoContext.Provider>
    )
}

export default TodoList
