import { useTodoManager } from '../hooks/todoManager.hook'
import { TodoManagerContext } from '../context/todoManager.context'
import Loader from './Loader'
import TodoItem from './TodoItem'

function TodoList() {
    const { loaded, todoList, addTodo, deleteTodo, updateTodo } = useTodoManager()

    if (!loaded) {
        return <Loader />
    }
    return (
        <TodoManagerContext.Provider value={{ addTodo, deleteTodo, updateTodo }}>
            <div className="todo-list">
                <h1 className="todo-list-header">Todo list</h1>
                {todoList.map((todo) => {
                    return <TodoItem todo={todo} key={todo.id} />
                })}
                <button className="btn-add-todo" type="button" onClick={addTodo}>
                    add
                </button>
            </div>
        </TodoManagerContext.Provider>
    )
}

export default TodoList
