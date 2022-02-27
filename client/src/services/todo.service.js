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

    async getTodoLists(userID) {
        return await getClientLists(userID)
    }

    async addTodoList(userID) {
        const newTodoList = { userID }
        await clientDB.todoList.put(newTodoList)
        return newTodoList
    }

    async deleteTodoList(userID, id) {
        let result = []
        const ids = Array.isArray(id) ? id : [id]
        await clientDB.transaction('!rw', clientDB.todoList, clientDB.todoItem, async () => {
            const todoListIDs = await clientDB.todoList
                .where('id')
                .anyOf(ids)
                .filter((list) => list.userID === userID)
                .primaryKeys()
            const todoItemIDs = await clientDB.todoItem
                .where('todoListID')
                .anyOf(todoListIDs)
                .keys()

            await clientDB.todoList.bulkDelete(todoListIDs)
            await clientDB.todoItem.bulkDelete(todoItemIDs)
            result = todoListIDs
        })
        return result
    }
}

export default new TodoService()
