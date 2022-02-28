import { use } from 'bcrypt/promises'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context'
import { useTodoManager } from '../../../hooks/todoManager.hook'
import Loader from '../../Loader'
import TodoCard from './TodoCard'

function TodoListPage(props) {
    const { id: todoListID } = props.props
    const userID = useContext(AuthContext).userData.id
    const todoManager = useTodoManager(userID)
    const [todoListData, setTodoListData] = useState()

    useEffect(() => {
        setTodoListData(todoManager.getTodoList(userID, todoListID))
    }, [userID, todoListID, todoManager])

    console.log(todoListData)

    if (todoManager.loading) return <Loader />
    return (
        <div className="page">
            <div className="page__title">{todoListData.title}</div>
            <div className="list-holder">
                {/* <div className="sticky-holder--add-button">
                    <div className="add-button" onClick={() => addTodoList(userID)}></div> 
                </div> */}
                {/* {TodoCard.map((todoList) => (
                    <TodoCard key={todoList.id} todoList={todoList} />
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
