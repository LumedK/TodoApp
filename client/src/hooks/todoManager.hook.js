import { useEffect, useState, useCallback } from 'react'
import {
    createTodo,
    getTodoListFromLocalStorage,
    getTodoListFromServer,
    mergeTodoListByVersion,
    saveTodoListToLocalStorage
} from '../common/todoManager.common'

export const useTodoManager = () => {
    const [todoList, setTodoList] = useState([])
    const [loaded, setLoaded] = useState(true)

    const loadTodoList = useCallback(async () => {
        setLoaded(false)

        setTodoList(
            mergeTodoListByVersion(
                todoList.concat(await getTodoListFromServer()).concat(getTodoListFromLocalStorage())
            )
        )

        saveTodoListToLocalStorage(todoList)

        setLoaded(true)
    }, [])

    useEffect(() => {
        loadTodoList()
    }, [loadTodoList])

    const addTodo = () => {
        const newList = todoList.concat(createTodo())
        setTodoList(newList)
        saveTodoListToLocalStorage(newList)
    }
    const deleteTodo = (id) => {
        const newList = todoList.filter((todo) => todo.id !== id)
        setTodoList(newList)
        saveTodoListToLocalStorage(newList)
    }
    const updateTodo = (id) => {
        const newList = todoList.map((todo) => {
            if (todo.id === id) todo.version++
            return todo
        })
        setTodoList(newList)
        saveTodoListToLocalStorage(newList)
    }

    return { loaded, todoList, addTodo, deleteTodo, updateTodo }
}
