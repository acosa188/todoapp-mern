const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: String,
    isCompleted: Boolean
})

module.exports = mongoose.model('Todo', todoSchema);