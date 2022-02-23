const todoService = require('../service/todo.service')
const { listDTO, todoDTO } = require('../dtos/todo.dto')

class TodoController {
    async getLists(req, res, next) {
        try {
            const userID = req?.user?.id
            const result = await todoService.getLists(userID)
            return res.json(result)
        } catch (error) {
            next(error)
        }
    }
    async createList(req, res, next) {
        try {
            const listData = listDTO(req.body)
            const result = await todoService.createList(listData)
            return res.json(result)
        } catch (error) {
            next(error)
        }
    }
    async updateList(req, res, next) {
        try {
            const listData = listDTO(req.body)
            const result = await todoService.updateList(listData)
            return res.json(result)
        } catch (error) {
            next(error)
        }
    }
    async deleteList(req, res, next) {
        try {
            const { listID } = req.body
            const result = await todoService.deleteList(listID)
            return res.json(result)
        } catch (error) {
            next(error)
        }
    }

    async getTodos(req, res, next) {
        try {
            const userID = req?.user?.id
            const listID = listDTO(req.body).id
            const result = await todoService.getTodos(userID, listID)
            return res.json(result)
        } catch (error) {
            next(error)
        }
    }
    async createTodo(req, res, next) {
        try {
            const userID = req?.user?.id
            const todoData = todoDTO(req.body)
            const result = await todoService.createTodo(userID, todoData)
            return res.json(result)
        } catch (error) {
            next(error)
        }
    }
    async updateTodo(req, res, next) {
        try {
            const userID = req?.user?.id
            const todoData = todoDTO(req.body)
            const result = await todoService.updateTodo(userID, todoData)
            return res.json(result)
        } catch (error) {
            next(error)
        }
    }
    async deleteTodo(req, res, next) {
        try {
            const userID = req?.user?.id
            const todoID = todoDTO(req.body).id
            const result = await todoService.deleteTodo(userID, todoID)
            return res.json(result)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new TodoController()
