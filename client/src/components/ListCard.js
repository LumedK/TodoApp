const listCard = (props) => {
    const {
        todoList: { id, title },
        handlers: { deleteButtonOnClick }
    } = props
    const idType = typeof id === 'string' ? 'srt' : 'num'

    const titleOnFocus = (event) => {
        console.log(event)
    }

    return (
        <div className="list-card">
            <div
                className="list-card__title"
                contentEditable="true"
                onBlur={titleOnFocus}
                inputMode="text"
                dangerouslySetInnerHTML={{ __html: title }}
            ></div>
            <div className="linked-text">Open</div>
            <div> | </div>
            <div
                id={`todoListDeleteID:${idType}:${id}`}
                className="linked-text"
                onClick={deleteButtonOnClick}
            >
                Delete
            </div>
        </div>
    )
}
export default listCard
