import { useCallback, useEffect, useRef, useState } from 'react'
import todoManager from '../managers/todo.manager'

export const useTodoManager = (identifiers = {}) => {
    const { userID, todoListID } = identifiers
    const [todoLists, setTodoLists] = useState()
    const [todoList, setTodoList] = useState()
    const [todoItems, setTodoItems] = useState()

    const initiateTodoData = useCallback(async () => {
        setTodoLists(await todoManager.getTodoLists(userID))
        setTodoList(await todoManager.getTodoList(todoListID))
        setTodoItems(await todoManager.getTodoItems(todoListID))
    }, [])

    useEffect(() => {
        initiateTodoData()
    }, [initiateTodoData])

    const updateTodoItem = async (todoListID, data = {}) => {
        setTodoItems(await todoManager.updateTodoItem(todoListID, data))
    }

    const deleteTodoItem = async (todoListID, todoItemID) => {
        setTodoItems(await todoManager.deleteTodoItem(todoListID, todoItemID))
    }

    return { todoLists, todoList, todoItems, updateTodoItem, deleteTodoItem }
}

// export const useTodo = (mode, identifiers) => {
//     const { userID, todoListID, todoItemID } = identifiers
//     const todoDataRef = useRef()
//     const [todoData, setTodoData] = useState(todoDataRef.current)

//     const initiateTodoData = useCallback(async () => {
//         if (todoDataRef.current) return

//     }, [])

//     useEffect(() => {
//         initiateTodoData()
//     }, [initiateTodoData])
// }

// const checkConditions = (mode, userID, todoListID, todoItemID) => {
//     return (
//         (mode === 'todoLists' && userID) ||
//         (mode === 'todoList' && userID && todoListID) ||
//         (mode === 'todoItem' && userID && todoListID && todoItemID)
//     )
// }

// export const useTodo = (mode, identifiers) => {
//     const { userID, todoListID, todoItemID } = identifiers

//     const todoListsRef = useRef()
//     const todoListRef = useRef()
//     const todoItemRef = useRef()

//     const [todoLists, setTodoLists] = useState(todoListsRef.current)
//     const [todoList, setTodoList] = useState(todoListRef.current)
//     const [todoItem, setTodoItem] = useState(todoItemRef.current)

//     useEffect(() => {
//         if (!checkConditions(mode, userID, todoListID, todoItemID))
//             return console.log('mode error:', mode, identifiers)
//         if (mode === 'todoLists') initiateTodoLists()
//         if (mode === 'todoList') initiateTodoList()
//         if (mode === 'todoItem') initiateTodoItem()
//     }, [])

//     const initiateTodoLists = useCallback(async () => {
//         if (todoListsRef.current) return

//         todoService.refreshClientDB(userID) // replace to manager
//         todoListsRef.current = await todoService.getTodoLists(userID)
//         setTodoLists(todoListsRef.current)
//     }, [])
//     const initiateTodoList = useCallback(async () => {
//         if (todoListsRef.current) return

//         todoListRef.current = await todoService.getTodoList(userID, todoListID)
//         setTodoList(todoListRef.current)
//     }, [])
//     const initiateTodoItem = useCallback(() => {}, [])

//     const updateTodoList = async (userID, todoListID, data = {}) => {
//         const isNew = !todoListID
//         const todoList = isNew ? {} : todoListsRef.current.find((list) => list.id === todoListID)

//         todoList.id = isNew ? uuidV4() : todoList.id
//         console.log(todoList.id)
//         todoList.userID = userID
//         todoList.title = data.title
//         todoList.version = data.version

//         if (todoListsRef.current) {
//             todoListsRef.current = todoListsRef.current.concat([todoList])
//             setTodoLists(todoListsRef.current)
//         }
//         if (todoListRef.current) {
//             todoListRef.current = todoList
//             setTodoList(todoListRef.current)
//         }

//         //update on db async
//     }
//     const deleteTodoList = async (userID, todoListID) => {
//         if (todoListsRef.current) {
//             todoListsRef.current = todoListsRef.current.filter((list) => list.id !== todoListID)
//             setTodoLists(todoListsRef.current)
//         }
//         if (todoListRef.current) {
//             todoListRef.current = {}
//             setTodoList(todoListRef.current)
//         }

//         //update on db async
//     }

//     const updateTodoItem = () => {}
//     const deleteTodoItem = () => {}

//     return {
//         todoLists,
//         todoList,
//         todoItem,
//         updateTodoList,
//         deleteTodoList,
//         updateTodoItem,
//         deleteTodoItem
//     }
// }

// //     const cachedUserID = useRef()
// //     const cachedTodoLists = useRef()
// //     // const cachedTodoListData = useRef()
// //     const [loading, setLoading] = useState(true)
// //     const [todoLists, setTodoLists] = useState(cachedTodoLists.current)
// //     const [todoListData, setTodoListData] = useState(cachedTodoLists.current)

// //     const resultUseMemo = useMemo(() => {
// //         return Date.now()
// //     }, [userID])
// //     console.log('memo', resultUseMemo)

// //     console.log(cachedUserID, cachedTodoLists)

// //     const setAndCacheTodoLists = (newTodoLists) => {
// //         cachedTodoLists.current = newTodoLists
// //         setTodoLists(newTodoLists)
// //     }
// //     // const setAndCacheTodoListData = (newTodoListData) => {
// //     //     cachedTodoListData.current = newTodoListData
// //     //     setTodoListData(newTodoListData)
// //     // }

// //     // const isUserIDCorrect = (userID)=>{
// //     //     if (userID === cachedUserID.current) return true
// //     //     cachedUserID.current = undefined
// //     //     cachedTodoLists.current = undefined
// //     //     cachedTodoListData.current = undefined
// //     // }

// //     const updateTodoListData = (todoListID, todoListData = undefined) => {
// //         if (todoListData) {
// //             //service upd
// //             setTodoListData(todoListData)
// //         } else if (!todoListData) {
// //             return todoLists.find((list) => list.id === todoListID)
// //         } else {
// //             return
// //         }
// //     }

// //     // const getTodoListData = (userID, todoListID) => {
// //     //     if (
// //     //         userID === cachedUserID.current &&
// //     //         cachedTodoListData.current &&
// //     //         todoListID === cachedTodoListData.current.id
// //     //     )
// //     //         return cachedTodoListData.current
// //     //     // if (userID !== currentUserID) return {}
// //     //     // return savedTodoList.find((list) => list.id === todoListID)
// //     // }

// //     const addTodoList = async (userID) => {
// //         setLoading(true)
// //         const result = await todoService.addTodoList(userID)
// //         setAndCacheTodoLists(await todoService.getTodoLists(userID))
// //         setLoading(false)
// //         return result
// //     }

// //     const deleteTodoList = async (userID, id) => {
// //         setLoading(true)
// //         const result = await todoService.deleteTodoList(userID, id)
// //         setAndCacheTodoLists(await todoService.getTodoLists(userID))
// //         setLoading(false)
// //         return result
// //     }

// //     const refreshClientDB = useCallback(async () => {
// //         if (userID === cachedUserID.current) {
// //             setLoading(false)
// //             return
// //         }
// //         cachedUserID.current = userID
// //         setLoading(true)
// //         try {
// //             todoService.refreshClientDB(userID)
// //         } catch (error) {
// //             console.log('refreshClientDB', error.message)
// //         }
// //         setAndCacheTodoLists(await todoService.getTodoLists(userID))
// //         setLoading(false)
// //     }, [userID])

// //     useEffect(() => {
// //         refreshClientDB()
// //     }, [refreshClientDB])

// //     return { loading, todoLists, addTodoList, deleteTodoList }
// // }

// //0. переименовать service в managers
// //2. В Хуке хранится отбор айдишек
// //3.
