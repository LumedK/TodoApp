export const createTodo = (todo = {}) => {
    const { id = 'Local:' + Date.now(), title = '', completed = false, version = 0 } = todo
    return { id, title, completed, version }
}

export const saveTodoListToLocalStorage = (todoList) => {
    localStorage.setItem('localTodoList', JSON.stringify(todoList))
}

export const getTodoListFromServer = async () => {
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

export const getTodoListFromLocalStorage = () => {
    let list
    try {
        list = JSON.parse(localStorage.getItem('localTodoList'))
        list = list.map((todo) => createTodo(todo))
    } catch (error) {
        list = []
    }
    return list
}

export const mergeTodoListByVersion = (todoList) => {
    const versions = new Map()
    todoList.forEach((todo) => {
        const { id, version } = todo
        if (!versions.has(id) || version > versions.get(id)) versions.set(id, todo)
    })
    return Array.from(versions.values())
}
