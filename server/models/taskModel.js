const mongoose = require('mongoose')

const taskSchema=mongoose.Schema(
    {
        name:{
            type: String,
        },
        leftDate:{
            type: String,
        }
    }
)

const Task=mongoose.model('Task',taskSchema);


module.exports = Task;