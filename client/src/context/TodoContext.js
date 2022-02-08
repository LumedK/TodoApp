import { createContext } from 'react'

function empty() {}

export const TodoContext = createContext({
    loaded: false,
    todoList: [],
    setTodoList: empty,
    addTodo: empty,
    deleteTodo: empty,
    editedId: '',
    setEditedId: empty
})
