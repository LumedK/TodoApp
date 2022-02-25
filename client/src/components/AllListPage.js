import { useTodos } from '../hooks/todo.hook'
import { useContext } from 'react'
import { AuthContext } from '../context/app.context'

function AllLists() {
    const userID = useContext(AuthContext).userData.id
    useTodos(userID)

    return (
        <div className="page">
            <div className="page__title">Todo lists</div>
            <div className="list-holder">
                <div className="list-card">
                    <div className="list-card__title">list 1</div>
                    <div className="linked-text">Open</div>
                    <div> | </div>
                    <div className="linked-text">Delete</div>
                </div>
                <div className="list-card">
                    <div className="list-card__title">list 1</div>
                    <div className="linked-text">Open</div>
                    <div> | </div>
                    <div className="linked-text">Delete</div>
                </div>
            </div>
            <div className="sticky-holder--add-button">
                <div className="add-button"></div>
            </div>
        </div>
    )
}

export default AllLists
