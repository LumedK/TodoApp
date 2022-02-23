const Router = require('express')
const todoController = require('../controllers/todo.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = Router()
router.get('/lists', authMiddleware, todoController.getLists)
router.post('/list', authMiddleware, todoController.createList)
router.patch('/list', authMiddleware, todoController.updateList)
router.delete('/list', authMiddleware, todoController.deleteList)

router.get('/todos', authMiddleware, todoController.getTodos)
router.post('/todo', authMiddleware, todoController.createTodo)
router.patch('/todo', authMiddleware, todoController.updateTodo)
router.delete('/todo', authMiddleware, todoController.deleteTodo)

module.exports = router
