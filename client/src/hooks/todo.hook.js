import { useCallback, useEffect } from 'react'
import todoService from '../services/todo.service'

let currentUserID

export const useTodos = async (userID) => {
    const refreshClientDB = useCallback(async () => {
        if (userID === currentUserID) return
        currentUserID = userID
        todoService.refreshClientDB(userID)
    }, [userID])

    useEffect(() => {
        refreshClientDB()
    }, [refreshClientDB])
}
