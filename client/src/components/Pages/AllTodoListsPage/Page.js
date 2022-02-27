import { useContext } from 'react'
import { AuthContext } from '../../../context'
import { useTodoManager } from '../../../hooks/todoManager.hook'
import Loader from '../../Loader'
import ListCard from './ListCard'

function AllLists() {
    const userID = useContext(AuthContext).userData.id
    const { loading, todoLists, addTodoList, deleteTodoList } = useTodoManager(userID)

    if (loading) return <Loader />

    return (
        <div className="page">
            <div className="page__title">Todo lists</div>
            <div className="list-holder">
                <div className="sticky-holder--add-button">
                    <div className="add-button" onClick={() => addTodoList(userID)}></div>
                </div>
                {todoLists.map((todoList) => (
                    <ListCard key={todoList.id} todoList={todoList} handlers={{ deleteTodoList }} />
                ))}
            </div>
        </div>
    )
}

export default AllLists
