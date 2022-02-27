import { useTodos } from '../hooks/todo.hook'
import { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/app.context'
import Loader from './Loader'
import ListCard from './ListCard'

function AllLists() {
    const userID = useContext(AuthContext).userData.id
    const { getTodoLists, addTodoList, deleteTodoList } = useTodos(userID)
    const [loading, setLoading] = useState(true)
    const [todoLists, setTodoLists] = useState([])

    const loadTodoList = useCallback(async () => {
        setTodoLists(await getTodoLists(userID))
        setLoading(false)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const addButtonOnClick = async () => {
        setTodoLists(await addTodoList(userID))
    }
    const deleteButtonOnClick = async (event) => {
        const idData = event.target.id.split(':')
        const id = idData[1] === 'num' ? Number(idData[2]) : idData[2]
        setTodoLists(await deleteTodoList(userID, id))
    }

    useEffect(() => {
        loadTodoList()
    }, [loadTodoList])

    if (loading) return <Loader />

    return (
        <div className="page">
            <div className="page__title">Todo lists</div>

            <div className="list-holder">
                <div className="sticky-holder--add-button">
                    <div className="add-button" onClick={addButtonOnClick}></div>
                </div>
                {todoLists.map((todoList) => (
                    <ListCard
                        key={todoList.id}
                        todoList={todoList}
                        handlers={{ deleteButtonOnClick }}
                    />
                ))}
            </div>
        </div>
    )
}

export default AllLists
