const { Schema, model } = require('mongoose')
const { version } = require('uuid')

const TodoListSchema = new Schema({
    title: { type: String },
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    version: { type: String, default: '0' }
})

module.exports = model('TodoList', TodoListSchema)
