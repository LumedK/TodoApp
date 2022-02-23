const TodoList = require('../models/todoList.model')
const Todo = require('../models/todo.model')
const User = require('../models/user.model')
const ApiError = require('./api-error.service')
const { listDTO, todoDTO } = require('../dtos/todo.dto')

class todoService {
    async getLists(userID) {
        if (!userID) return []
        return await (await TodoList.find({ userID })).map((todo) => listDTO(todo))
    }
    async createList(listData) {
        const { userID } = listData
        if (!userID) throw ApiError.badRequest('Unable to create a list. User not found')
        const user = await User.findById(userID)
        if (!user) throw ApiError.badRequest('Unable to create a list. User not found')
        const newList = await TodoList.create(listData)
        return listDTO(await newList.save())
    }
    async updateList(listData) {
        if (!listData.id) throw ApiError.badRequest('Unable to update the list. List not found')
        const list = await TodoList.findById(listData.id)
        if (!list) throw ApiError.badRequest('Unable to update the list. List not found')

        Object.keys(listData).forEach((key) => {
            const value = listData[key]
            if (value !== undefined) list[key] = value
        })

        return listDTO(await list.save())
    }
    async deleteList(listID) {
        const list = await TodoList.findByIdAndDelete(listID)
        if (!list) throw ApiError.badRequest('Unable to delete the list. List not found')
        return listDTO(list)
    }

    async getTodos(currentUserID, listID) {
        console.log()

        if (
            !currentUserID ||
            !listID ||
            !(await TodoList.findById(listID)).userID === currentUserID
        )
            throw ApiError.badRequest('Unable to get todos. Incorrect data')

        return (await Todo.find({ listID })).map((todo) => todoDTO(todo))
    }
    async createTodo(currentUserID, todoData) {
        if (
            !currentUserID ||
            !todoData.listID ||
            !(await TodoList.findById(todoData.listID))._id === currentUserID
        )
            throw ApiError.badRequest('Unable to create a todo. Incorrect data')

        const todo = await Todo.create(todoData)
        return todoDTO(await todo.save())
    }
    async updateTodo(currentUserID, todoData) {
        if (!currentUserID || !todoData.id)
            throw ApiError.badRequest('Unable to update a todo. Incorrect data')
        const todo = await Todo.findById(todoData.id)
        if (!todo) throw ApiError.badRequest('Unable to update a todo. Incorrect data')

        Object.keys(todoData).forEach((key) => {
            const value = todoData[key]
            if (value !== undefined) todo[key] = value
        })

        return todoDTO(await todo.save())
    }
    async deleteTodo(currentUserID, todoID) {
        const todo = await Todo.findById(todoID)
        if (!todo) throw ApiError.badRequest('Unable to delete task. Task not found')
        if (!currentUserID === (await TodoList.findById(todo.listID)).userID)
            throw ApiError.badRequest('Unable to delete task. Task not found')
        todo.deleteOne()
        return todoDTO(todo)
    }
}

module.exports = new todoService()
