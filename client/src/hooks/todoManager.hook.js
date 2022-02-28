import { useCallback, useEffect, useState } from 'react'
import todoService from '../services/todo.service'

let currentUserID
let savedTodoList

export const useTodoManager = (userID) => {
    const [loading, setLoading] = useState(false)
    const [todoLists, setTodoLists] = useState([])
    const setAndSaveTodoLists = (newTodoLists) => {
        savedTodoList = newTodoLists
        setTodoLists(newTodoLists)
    }

    const getTodoList = (userID, todoListID) => {
        if (userID !== currentUserID) return {}
        return savedTodoList.find((list) => list.id === todoListID)
    }

    const addTodoList = async (userID) => {
        setLoading(true)
        const result = await todoService.addTodoList(userID)
        setAndSaveTodoLists(await todoService.getTodoLists(userID))
        setLoading(false)
        return result
    }

    const deleteTodoList = async (userID, id) => {
        setLoading(true)
        const result = await todoService.deleteTodoList(userID, id)
        setAndSaveTodoLists(await todoService.getTodoLists(userID))
        setLoading(false)
        return result
    }

    const refreshClientDB = useCallback(async () => {
        if (userID === currentUserID) {
            setTodoLists(savedTodoList)
            return
        }
        currentUserID = userID
        setLoading(true)
        try {
            todoService.refreshClientDB(userID)
        } catch (error) {
            console.log('refreshClientDB', error.message)
        }
        setAndSaveTodoLists(await todoService.getTodoLists(userID))
        setLoading(false)
    }, [userID])

    useEffect(() => {
        refreshClientDB()
    }, [refreshClientDB])

    return { loading, todoLists, addTodoList, deleteTodoList, getTodoList }
}
