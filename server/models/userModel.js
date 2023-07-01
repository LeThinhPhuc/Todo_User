import mongoose from "mongoose";
import Task from "./taskModel";
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
module.exports = User;