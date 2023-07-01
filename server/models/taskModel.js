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

const userSchema=mongoose.Schema(
    {
        userName:{
            type: String,
        },
        email:{
            type: String,
        },
        password:{
            type: String,
        },
        todos:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Task'
        }]
    }
)

const User=mongoose.model('User',userSchema);

module.exports = {
    Task,
    User,
}