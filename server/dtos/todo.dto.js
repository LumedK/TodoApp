class DTO {
    listDTO = (data) => {
        let { _id, id, userID, title } = data
        id = _id || id
        return { id, userID, title }
    }

    todoDTO = (data) => {
        let { _id, id, completed, title, listID } = data
        id = _id || id
        return { id, completed, title, listID }
    }
}

module.exports = new DTO()
