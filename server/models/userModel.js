// import mongoose from "mongoose";
const mongoose = require('mongoose');
const Task = require('./taskModel');
// import Task from "./taskModel";
const userSchema=mongoose.Schema(
    {
        username:{
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