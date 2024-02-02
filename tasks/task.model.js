const mongoose = require('mongoose')
// require('../items/item.model')
require('../users/user.model')

const taskSchema = new mongoose.Schema({
    taskCreateDate: {
        type: Date,
        default: Date.now
    },
    taskToDoDate: {
        type: Date,
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
        required: true
    },
    text:{
        type:String,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
})
const taskModel = mongoose.model('task', taskSchema)
module.exports = taskModel;

   