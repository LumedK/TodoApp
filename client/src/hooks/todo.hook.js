import { useEffect, useState, useCallback } from 'react'

export const useTodoManager = () => {
    let [todoList, setTodoList] = useState([])
    const [loaded, setLoaded] = useState(false)

    async function getTodoList() {
        const getServerList = async () => {
            let list
            try {
                const fetched = await fetch('/api/getList', { method: 'GET' })
                list = await fetched.json()
                list = list.map((todo) => createTodo(todo))
            } catch (error) {
                list = []
            }
            return list
        }
        const getLocalList = () => {
            let list
            try {
                list = JSON.parse(localStorage.getItem('localTodoList'))
                list = list.map((todo) => createTodo(todo))
            } catch (error) {
                list = []
            }
            return list
        }

        const serverList = await getServerList()
        const versions = new Map()
        serverList.concat(getLocalList()).forEach((todo) => {
            const { id, version } = todo
            if (!versions.has(id) || versions.get(id) < version) {
                versions.set(id, todo)
            }
        })

        // localStorage.clear()

        // console.log(versions)
        // console.log(Array.from(versions.values()))

        return Array.from(versions.values())
    }

    function createTodo(todo = {}) {
        const { id = 'Local:' + Date.now(), title = '', completed = false, version = 0 } = todo

        return { id, title, completed, version }
    }

    function saveTodoList() {
        localStorage.setItem('localTodoList', JSON.stringify(todoList))
    }

    const loadTodoList = useCallback(async () => {
        setLoaded(false)
        setTodoList(await getTodoList())
        setLoaded(true)
    }, [])

    const addTodo = () => {
        const newTodo = createTodo()
        todoList.push(newTodo)
        setTodoList(todoList.slice())
        saveTodoList()
    }
    const deleteTodo = (id) => {
        setTodoList(todoList.filter((todo) => todo.id !== id))
        saveTodoList()
    }
    const updateTodo = (id) => {
        setTodoList(
            todoList.map((todo) => {
                if (todo.id === id) todo.version++
                return todo
            })
        )
        saveTodoList()
    }

    useEffect(() => {
        loadTodoList()
    }, [loadTodoList])

    return { loaded, todoList, setTodoList, addTodo, deleteTodo, updateTodo }
}
