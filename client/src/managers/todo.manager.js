import http from './http.manager'
import { clientDB } from '../db'
import { v4 as uuidV4 } from 'uuid'

async function updateClientDB(userID) {
    console.log('updateClientDB: expensive')

    // get server lists
    let resHttp = await http('/api/todo/lists')
    if (!resHttp.ok) return console.log('updateClientDB: Unable to get server data')
    const serverLists = resHttp.data
    // get client lists
    const clientLists = await clientDB.todoList.where({ userID }).toArray()
    // check the versions of the lists
    const updateTodoLists = []
    const updateListsIDs = []
    const versions = new Map(clientLists.map((list) => [list.id, list]))
    serverLists.forEach((serverList) => {
        const clientVersion = versions.get(serverList.id)
        if (!clientVersion || clientVersion.version < serverList.version) {
            updateListsIDs.push(serverList.id)
            updateTodoLists.push(serverList)
        }
    })
    // get server todo items to update
    resHttp = await http('/api/todo/todos', { listIDs: updateListsIDs })
    if (!resHttp.ok) return
    const updateTodoItems = resHttp.data
    // update clientDB
    let updated = false
    await clientDB.transaction('!rw', clientDB.todoList, clientDB.todoItem, async () => {
        await clientDB.todoList.bulkPut(updateTodoLists)
        await clientDB.todoItem.bulkPut(updateTodoItems)
        updated = true
    })
    if (!updated) return console.log('updateClientDB: Unable to update client DB')
    return true
}

let dev_count = 0

class TodoManager {
    static userID = undefined
    static todoListID = undefined
    static todoLists = undefined
    static todoList = undefined
    static todoItems = undefined
    // static todoItem = undefined

    async updateTodoData(identifiers) {
        const updateTodoLists =
            !TodoManager.userID ||
            (!!identifiers.userID && TodoManager.userID !== identifiers.userID)
        const updateTodoList =
            identifiers.updateTodoList ||
            updateTodoLists ||
            !TodoManager.todoListID ||
            (identifiers.todoListID && TodoManager.todoListID !== identifiers.todoListID)

        if (updateTodoLists) {
            TodoManager.userID = identifiers.userID
            await this.updateTodoLists(identifiers.userID)
        }
        if (updateTodoList) {
            TodoManager.todoListID = identifiers.todoListID
            await this.updateTodoList(identifiers.todoListID)
        }
    }

    async updateTodoLists(userID) {
        const isUpdated = await updateClientDB(userID)
        if (!isUpdated) return
        TodoManager.todoLists = await clientDB.todoList.where({ userID }).toArray()
    }

    async updateTodoList(todoListID) {
        if (!todoListID) return
        TodoManager.todoList = TodoManager.todoLists.find?.((list) => list.id === todoListID)
        TodoManager.todoItems = await clientDB.todoItem.where({ todoListID }).toArray()
        console.log('updateTodoLists')
    }

    async getTodoLists(userID) {
        await this.updateTodoData({ userID })
        return TodoManager.todoLists || []
    }

    async getTodoList(todoListID) {
        await this.updateTodoData({ todoListID })
        return TodoManager.todoList || {}
    }

    async getTodoItems(todoListID) {
        await this.updateTodoData({ todoListID })
        return TodoManager.todoItems || []
    }

    async updateTodoItem(todoListID, todoItem = {}) {
        const createNew = !todoItem.id
        if (createNew) {
            todoItem = {
                id: uuidV4(),
                todoListID,
                completed: false,
                title: 'New task'
            }
        }
        await clientDB.todoItem.put(todoItem, todoItem.id)
        await this.updateTodoData({ todoListID, updateTodoList: true })
        return TodoManager.todoItems || []
    }

    async deleteTodoItem(todoListID, todoItemID) {
        try {
            console.log(todoItemID)
            await clientDB.todoItem.delete(todoItemID)
        } catch (error) {
            console.log('deleteTodoItem: Unable to delete todo item')
        }
        await this.updateTodoData({ todoListID, updateTodoList: true })
        return TodoManager.todoItems || []
    }
}

export default new TodoManager()

// // async function getServerData(){

// // }
// async function getClientData(identifiers = {}) {
//     const { userID, todoListID, todoItemID } = identifiers
//     const whereSelection = { userID }
//     if (todoListID) whereSelection.todoListID = todoListID

//     const clientTodoLists = await clientDB.todoList.where(whereSelection).toArray()

//     const todoListsIDs = clientTodoLists.map((list) => list.id)
//     const clientTodoItems = await clientDB.todoItem
//         .where('todoListID')
//         .anyOf(todoListsIDs)
//         .filter((todo) => !todoItemID || todo.id === todoItemID)
//         .toArray()

//     const clientData = new Map()
//     clientTodoLists.forEach(list =>{
//         clientData.set(list.id, list)
//     })
//     clientTodoItems.forEach(todo => {
//         const list = clientTodoLists.get(todo.listID)
//         if (list){
//             list.todoItems = list.todoItems || new Map()
//             list.todoItems.set(todo.id)
//         }

//     })

// }

// async function getTodoData(identifiers = {}) {
//     const { userID, todoListID, todoItemID } = identifiers
//     const whereSelection = { userID }
//     if (todoListID) whereSelection.todoListID = todoListID

//     const clientTodoLists = await clientDB.todoList.where(whereSelection).toArray()
//     const resHttp = await http('/api/todo/lists')
//     const serverTodoLists = resHttp.ok ? resHttp.data : []

//     const serverTodoListsID = []
//     const listVersions = new Map()
//     clientTodoLists.forEach((todoList) => {
//         listVersions.set(todoList.id, todoList.version)
//     })
//     serverTodoLists.forEach((todoList) => {
//         const clientVersion = listVersions.get(todoList.id)
//         if (!clientVersion || todoList.version > clientVersion) serverTodoListsID.push(todoList.id)
//     })

//     // const todoListsIDs = todoLists.map((list) => list.id)
//     // const todoItems = await clientDB.todoItem.where('todoListID').anyOf(todoListsIDs).toArray()
// }

// // const mergeByVersion = (array) => {
// //     const versions = new Map()
// //     array.forEach((element) => {
// //         const { id, version } = element
// //         if (!versions.has(id) || version > versions.get(id)) versions.set(id, element)
// //     })
// //     return Array.from(versions.values())
// // }

// // const fillTodoLists = (todoLists, todoItems) => {
// //     const map = new Map()
// //     todoLists.forEach((list) => map.set(list.id, list))
// //     todoItems.forEach((item) => {
// //         const todoList = map.get(item.listID)
// //         if (!todoList.todoItems) todoList.todoItems = []
// //         todoList.todoItems.push(item)
// //     })
// //     return todoLists
// // }

// // const getServerLists = async (userID) => {
// //     let todoLists = []
// //     let resHttp = await http('/api/todo/lists')
// //     if (resHttp.ok) todoLists = resHttp.data

// //     let todoItems = []
// //     resHttp = await http('/api/todo/todos')
// //     if (resHttp.ok) todoItems = resHttp.data

// //     return fillTodoLists(todoLists, todoItems)
// // }

// // const getClientLists = async (userID) => {
// //     const todoLists = await clientDB.todoList.where({ userID }).toArray()
// //     const todoListsIDs = todoLists.map((list) => list.id)
// //     const todoItems = await clientDB.todoItem.where('todoListID').anyOf(todoListsIDs).toArray()

// //     return fillTodoLists(todoLists, todoItems)
// // }

// // class TodoService {
// //     async refreshClientDB(userID) {
// //         const serverTodoList = await getServerLists(userID)
// //         const clientTodoList = await getClientLists(userID)

// //         const todoLists = mergeByVersion(serverTodoList.concat(clientTodoList))
// //         const todoItems = []
// //         todoLists.forEach((list) => {
// //             todoItems.concat(list.todoItems)
// //             delete list.todoItems
// //         })

// //         await clientDB.todoList.bulkPut(todoLists)
// //         await clientDB.todoItem.bulkPut(todoItems)
// //     }

// //     async getTodoLists(userID) {
// //         return await getClientLists(userID)
// //     }

// //     async addTodoList(userID) {
// //         const newTodoList = { userID }
// //         await clientDB.todoList.put(newTodoList)
// //         return newTodoList
// //     }

// //     async deleteTodoList(userID, id) {
// //         let result = []
// //         const ids = Array.isArray(id) ? id : [id]
// //         await clientDB.transaction('!rw', clientDB.todoList, clientDB.todoItem, async () => {
// //             const todoListIDs = await clientDB.todoList
// //                 .where('id')
// //                 .anyOf(ids)
// //                 .filter((list) => list.userID === userID)
// //                 .primaryKeys()
// //             const todoItemIDs = await clientDB.todoItem
// //                 .where('todoListID')
// //                 .anyOf(todoListIDs)
// //                 .keys()

// //             await clientDB.todoList.bulkDelete(todoListIDs)
// //             await clientDB.todoItem.bulkDelete(todoItemIDs)
// //             result = todoListIDs
// //         })
// //         return result
// //     }
// // }

// // export default new TodoService()
