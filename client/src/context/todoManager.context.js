import { createContext } from 'react'

const empty = () => {}

export const TodoManagerContext = createContext({
    loaded: true,
    todoList: [],
    addTodo: empty,
    deleteTodo: empty,
    updateTodo: empty
})
