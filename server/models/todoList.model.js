const { Schema, model } = require('mongoose')

const TodoListSchema = new Schema({
    title: { type: String },
    userID: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = model('TodoList', TodoListSchema)
