import { useContext } from 'react'
import { AuthContext } from '../../../context'
import { useTodo } from '../../../hooks/useTodo'
import Loader from '../../Loader'
import ListCard from './ListCard'

function AllLists() {
    const userID = useContext(AuthContext).userData.id
    const { todoLists, updateTodoList, deleteTodoList } = useTodo('todoLists', { userID })

    if (!todoLists) return <Loader />

    // console.log(loading, todoLists)

    return (
        <div className="page">
            <div className="page__title">Todo lists</div>
            <div className="list-holder">
                <div className="sticky-holder--add-button">
                    <div className="add-button" onClick={() => updateTodoList(userID)}></div>
                </div>
                {todoLists.map((todoList) => (
                    <ListCard key={todoList.id} todoList={todoList} handlers={{ deleteTodoList }} />
                ))}
            </div>
        </div>
    )
}

export default AllLists
