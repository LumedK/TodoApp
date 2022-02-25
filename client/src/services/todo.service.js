import http from './http.service'
import { clientDB } from '../db'

const mergeByVersion = (array) => {
    const versions = new Map()
    array.forEach((element) => {
        const { id, version } = element
        if (!versions.has(id) || version > versions.get(id)) versions.set(id, element)
    })
    return Array.from(versions.values())
}

const fillTodoLists = (todoLists, todoItems) => {
    const map = new Map()
    todoLists.forEach((list) => map.set(list.id, list))
    todoItems.forEach((item) => {
        const todoList = map.get(item.listID)
        if (!todoList.todoItems) todoList.todoItems = []
        todoList.todoItems.push(item)
    })
    return todoLists
}

const getServerLists = async (userID) => {
    let todoLists = []
    let resHttp = await http('/api/todo/lists')
    if (resHttp.ok) todoLists = resHttp.data

    let todoItems = []
    resHttp = await http('/api/todo/todos')
    if (resHttp.ok) todoItems = resHttp.data

    return fillTodoLists(todoLists, todoItems)
}

const getClientLists = async (userID) => {
    const todoLists = await clientDB.todoList.where({ userID }).toArray()
    const todoListsIDs = todoLists.map((list) => list.id)
    const todoItems = await clientDB.todoItem.where('todoListID').anyOf(todoListsIDs).toArray()

    return fillTodoLists(todoLists, todoItems)
}

class TodoService {
    async refreshClientDB(userID) {
        const serverTodoList = await getServerLists(userID)
        const clientTodoList = await getClientLists(userID)

        const todoLists = mergeByVersion(serverTodoList.concat(clientTodoList))
        const todoItems = []
        todoLists.forEach((list) => {
            todoItems.concat(list.todoItems)
            delete list.todoItems
        })

        await clientDB.todoList.bulkPut(todoLists)
        await clientDB.todoItem.bulkPut(todoItems)
    }

    async updateClientDB(userID, todoList) {}
}

export default new TodoService()
