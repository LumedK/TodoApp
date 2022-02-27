import { useContext } from 'react'
import { AuthContext, CurrentPageContext } from '../../../context'

const ListCard = (props) => {
    const userID = useContext(AuthContext).userData.id
    const currentPageContext = useContext(CurrentPageContext)
    const { todoList, handlers } = props

    const OnClickOpen = () => {
        currentPageContext.setCurrentPage()
    }

    return (
        <div className="list-card">
            <div className="list-card__title">{todoList.title}</div>
            <div className="linked-text" onClick={OnClickOpen}>
                Open
            </div>
            <div> | </div>
            <div
                className="linked-text"
                onClick={() => handlers.deleteTodoList(userID, todoList.id)}
            >
                Delete
            </div>
        </div>
    )
}
export default ListCard
