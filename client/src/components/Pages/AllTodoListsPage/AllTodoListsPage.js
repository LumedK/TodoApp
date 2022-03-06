import { useContext } from 'react'
import { AuthContext } from '../../../context'
import { useTodoManager } from '../../../hooks/useTodoManager'
import Loader from '../../Loader'
import ListCard from './ListCard'

function AllLists() {
    const userID = useContext(AuthContext).userData.id
    const todoManager = useTodoManager({ userID })

    const deleteTodoList = () => {}
    const updateTodoList = (userID) => {}

    if (!todoManager.todoLists) return <Loader />
    return (
        <div className="page">
            <div className="page__title">Todo lists</div>
            <div className="list-holder">
                <div className="sticky-holder--add-button">
                    <div className="add-button" onClick={() => updateTodoList(userID)}></div>
                </div>
                {todoManager.todoLists.map((todoList) => (
                    <ListCard key={todoList.id} todoList={todoList} handlers={{ deleteTodoList }} />
                ))}
            </div>
        </div>
    )
}

export default AllLists
