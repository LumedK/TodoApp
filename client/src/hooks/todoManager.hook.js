import { useCallback, useEffect, useState } from 'react'
import todoService from '../services/todo.service'

let currentUserID

export const useTodoManager = (userID) => {
    const [loading, setLoading] = useState(false)
    const [todoLists, setTodoLists] = useState([])

    const addTodoList = async (userID) => {
        setLoading(true)
        const result = await todoService.addTodoList(userID)
        setTodoLists(await todoService.getTodoLists(userID))
        setLoading(false)
        return result
    }

    const deleteTodoList = async (userID, id) => {
        setLoading(true)
        const result = await todoService.deleteTodoList(userID, id)
        setTodoLists(await todoService.getTodoLists(userID))
        setLoading(false)
        return result
    }

    const refreshClientDB = useCallback(async () => {
        if (userID === currentUserID) return
        currentUserID = userID
        setLoading(true)
        try {
            todoService.refreshClientDB(userID)
        } catch (error) {
            console.log('refreshClientDB', error.message)
        }
        setTodoLists(await todoService.getTodoLists(userID))
        setLoading(false)
    }, [userID])

    useEffect(() => {
        refreshClientDB()
    }, [refreshClientDB])

    return { loading, todoLists, addTodoList, deleteTodoList }
}
