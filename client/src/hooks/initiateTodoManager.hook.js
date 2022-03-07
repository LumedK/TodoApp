import { useCallback, useEffect, useRef, useState } from 'react'
import todoAPI from '../api/todo.api'

export const useTodoManager = (userID) => {
    const userIDRef = useRef()
    const [todoLists, setTodoLists] = useState()
    const [todoItems, setTodoItems] = useState()

    const updateTodoList = async () => {
        await todoAPI.updateTodoList(userIDRef.current)
        setTodoLists(await todoAPI.getTodoLists(userIDRef.current))
    }
    const deleteTodoList = async (todoListID) => {
        await todoAPI.deleteTodoList(userIDRef.current, todoListID)
        setTodoLists(await todoAPI.getTodoLists(userIDRef.current))
    }

    const updateTodoItem = async (todoListID) => {
        await todoAPI.updateTodoItem(userIDRef.current, todoListID)
        setTodoItems(await todoAPI.getTodoItems(userIDRef.current, todoListID))
    }
    const deleteTodoItem = async (todoListID, todoItemID) => {
        await todoAPI.deleteTodoItem(todoItemID)
        setTodoItems(await todoAPI.getTodoItems(userIDRef.current, todoListID))
    }

    const initiateTodoData = useCallback(async () => {
        if (!userID) return
        userIDRef.current = userID
        const todoData = await todoAPI.getTodoData(userIDRef.current)
        setTodoItems(todoData.todoItems)
        setTodoLists(todoData.todoLists)
    }, [userID])

    useEffect(() => {
        initiateTodoData()
    }, [initiateTodoData])

    return { todoLists, todoItems, updateTodoList, deleteTodoList, updateTodoItem, deleteTodoItem }
}
