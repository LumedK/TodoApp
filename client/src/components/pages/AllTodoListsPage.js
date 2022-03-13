import { useContext } from 'react'
import { TodoManagerContext, PageManagerContext } from '../../context'
import Loader from '../Loader'
import TodoList from '../todoComponents/TodoList'

function AllLists() {
    const todoManager = useContext(TodoManagerContext)
    const pageManager = useContext(PageManagerContext)

    const onClickAddTodoList = async () => {
        const newTodoListID = await todoManager.updateTodoList()
        pageManager.openPage('todoListPage', { id: newTodoListID })
    }

    if (!todoManager.todoLists) return <Loader />
    return (
        <div className="page">
            <div className="page__title">Todo lists</div>
            <div className="list-holder">
                <div className="sticky-holder--add-button">
                    <div className="add-button" onClick={onClickAddTodoList}></div>
                </div>
                {todoManager.todoLists.map((todoList) => (
                    <TodoList key={todoList.id} todoList={todoList} />
                ))}
            </div>
        </div>
    )
}

export default AllLists
