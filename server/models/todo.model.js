const { Schema, model } = require('mongoose')

const TodoSchema = new Schema({
    completed: { type: Boolean },
    title: { type: String },
    listID: { type: Schema.Types.ObjectId, ref: 'TodoList' }
})

module.exports = model('Todo', TodoSchema)
