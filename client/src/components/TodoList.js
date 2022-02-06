import { useState, useEffect, useCallback } from 'react'
import Loader from './Loader'
import TodoItem from './TodoItem'

function TodoList() {
    const [todoList, setTodoList] = useState([])
    const [loading, setLoading] = useState(true)

    const loadTodoListFromServer = useCallback(async () => {
        let data = []
        setLoading(true)
        try {
            const fetched = await fetch('/api/getList', { method: 'GET' })
            data = await fetched.json()
        } catch (error) {}
        setTodoList(data)
        setLoading(false)
    }, [])

    function addTodoItem() {
        const newTodoList = todoList.slice()
        newTodoList.push({}) // add empty todo
        setTodoList(newTodoList)
    }

    useEffect(() => {
        loadTodoListFromServer()
    }, [loadTodoListFromServer])

    if (loading) {
        return <Loader />
    }
    return (
        <div className="todo-list">
            <h1 className="todo-list--header">Todo list</h1>
            {todoList.map((todoItem, index) => {
                return <TodoItem todoItem={todoItem} key={index} />
            })}
            <button className="todo-list--btn-add" type="button" onClick={addTodoItem}>
                add
            </button>
        </div>
    )
}

export default TodoList
