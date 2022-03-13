import { clientDB } from '../db'
import http from './http.api'

async function updateClientDB(userID) {
    console.log('updateClientDB: expensive')

    // get server lists
    let resHttp = await http('/api/todo/lists')
    if (!resHttp.ok) return console.log('updateClientDB: Unable to get server data')
    const serverLists = resHttp.data
    // get client lists
    const clientLists = await clientDB.todoList.where({ userID }).toArray()
    // check versions of lists
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
function nextVersion(version) {
    if (!version) return `${Date.now()}:0`
    const index = Number(version.split(':')[1]) || 0
    return `${Date.now()}:${index + 1}`
}

async function getTodoData(userID) {
    await updateClientDB(userID)
    const todoLists = await getTodoLists(userID)
    const todoItems = await clientDB.todoItem
        .where('todoListID')
        .anyOf(todoLists.map((list) => list.id))
        .toArray()
    return { todoLists, todoItems }
}

async function getTodoLists(userID) {
    return await clientDB.todoList.where({ userID }).toArray()
}

async function updateTodoList(userID, todoListID = undefined, todoList = {}) {
    const oldTodoList =
        todoListID && todoList.id && (await clientDB.todoList.get({ userID, todoListID }))
    todoList.userID = userID
    if (oldTodoList) {
        todoList.title = todoList.title || oldTodoList.title
        todoList.version = nextVersion(oldTodoList.version)
    } else {
        todoList.title = todoList.title || ''
        todoList.version = nextVersion()
    }
    return await clientDB.todoList.put(todoList)
}

async function deleteTodoList(userID, todoListID) {
    if (await clientDB.todoList.get({ userID, id: todoListID }))
        return await clientDB.todoList.delete(todoListID)
}

async function getTodoItems(userID, todoListIDs = []) {
    const usersListsID = new Set(
        (await clientDB.todoList.where({ userID }).toArray()).map((list) => list.id)
    )
    todoListIDs = (Array.isArray(todoListIDs) ? todoListIDs : [todoListIDs]).filter((id) =>
        usersListsID.has(id)
    )

    return await clientDB.todoItem.where('todoListID').anyOf(todoListIDs).toArray()
}

async function updateTodoItem(userID, todoListID, todoItemID, todoItem = {}) {
    const oldTodoItem =
        todoItemID && todoItem.id && (await clientDB.todoItem.get({ id: todoItemID }))
    todoItem.todoListID = todoListID
    if (oldTodoItem) {
        todoItem.title = todoItem.title || todoItem.title
    } else {
        todoItem.title = todoItem.title || 'Enter the name of the task ...'
    }
    return await clientDB.todoItem.put(todoItem)
}

async function deleteTodoItem(todoItemID) {
    return await clientDB.todoItem.delete(todoItemID)
}

const todoAPI = {
    getTodoData,
    getTodoLists,
    getTodoItems,
    updateTodoList,
    updateTodoItem,
    deleteTodoList,
    deleteTodoItem
}
export default todoAPI
