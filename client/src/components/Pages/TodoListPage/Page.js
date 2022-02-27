import { useContext } from 'react'
import { AuthContext } from '../../../context'
import { useTodoManager } from '../../../hooks/todoManager.hook'
import Loader from '../../Loader'
// import TodoCard from './TodoCard'

function TodoListPage(props) {
    const { id: todoListID } = props.props
    const userID = useContext(AuthContext).userData.id
    const { getTodoItems } = useTodoManager(userID)

    //? Лишний вызов useTodoManager
    console.log(1)

    // console.log('todos', getTodoItems(userID, todoListID))

    // console.log(userID)

    if (false) return <Loader />
    return (
        <div className="page">
            <div className="page__title">123 123</div>
            <div className="list-holder">
                {/* <div className="sticky-holder--add-button">
                    <div className="add-button" onClick={() => addTodoList(userID)}></div> 
                </div> */}
                {/* {todoLists.map((todoList) => (
                    <TodoCard key={todoList.id} todoList={todoList} handlers={{ deleteTodoList }} />
                ))} */}
            </div>
        </div>
    )
}

export default TodoListPage

// const TodoListPage = () => {
//     return <h1>todoPage</h1>
// }

// export default TodoListPage
