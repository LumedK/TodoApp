import { useCallback, useEffect } from 'react'
import todoService from '../services/todo.service'

let currentUserID

export const useTodos = (userID) => {
    const getTodoLists = async (userID) => {
        let todoLists = []
        try {
            todoLists = await todoService.getTodoLists(userID)
        } catch (error) {
            console.log('getTodoLists', error.message)
            todoLists = []
        }
        return todoLists
    }

    const addTodoList = async (userID) => {
        await todoService.addTodoList(userID)
        const todoLists = await todoService.getTodoLists(userID)
        return todoLists
    }

    const deleteTodoList = async (userID, id) => {
        await todoService.deleteTodoList(userID, id)
        const todoLists = await todoService.getTodoLists(userID)
        return todoLists
    }

    const refreshClientDB = useCallback(async () => {
        try {
            if (userID === currentUserID) return
            currentUserID = userID
            todoService.refreshClientDB(userID)
        } catch (error) {
            console.log('refreshClientDB', error.message)
        }
    }, [userID])

    useEffect(() => {
        refreshClientDB()
    }, [refreshClientDB])

    return { getTodoLists, addTodoList, deleteTodoList }
}
