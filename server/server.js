const express =require('express');
const cors = require('cors');
// import cors from "cors";
const mongoose = require('mongoose');
const Task=require('./models/taskModel');
const app=express();

app.use(express.json())
// app.use(cors());
app.use(cors());
// app.use(express.urlencoded({extended: false}))

app.get('/',(req,res)=>{
    res.send('Welcome PhucTD');
})

app.get('/blog', (req,res)=>{
    res.send("Helo this is my blog")
})


app.get('/task', async(req,res)=>{
    try{
        const task=await Task.find({});
        // res.status(200).json(task);
        res.json({
            message: "Success Delete Job",
            newData: task,
          });
    } catch(error){
        res.status(500).json({message:ErrorEvent.message})
    }
})

app.get('/task/:id', async(req,res)=>{
    try{
        const {id}=req.params;
        const task=await Task.findById(id);
        // res.status(200).json(task);
        res.json({
            message: "Success Delete Job",
            newData: task,
          });
    }catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.post('/task', async (req, res) => {
    try{
        // const task=await Task.create(req.body)

        const job = new Task(req.body);

        await job.save();
    
        const newDataJob = await Task.find();
        // res.status(200).json(task)
        res.json({
            message: "Success Delete Job",
            newData: newDataJob,
          });
    }catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})


app.put('/task/:id', async (req, res) => {
    try{
        const {id}=req.params
        const task = await Task.findByIdAndUpdate(id,req.body)
        if(!task){
            return res.status(404).json({message:`cannot find any product with ID ${id}`})
        }
        
        // const updatedTask=await Task.findById(id)
        
        await Task.findByIdAndUpdate(id,req.body)
        const newDataTask=await Task.find();
        
        // res.status(200).json(updatedTask)
        res.json({
            message: "Success Delete Job",
            newData: newDataTask,
          });
    }catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.delete('/task/:id', async (req, res) => {
    try{
        const {id}=req.params
        const task=await Task.findByIdAndDelete(id)
        if(!task){
            return res.status(404).send({message:`cannot find any task with id ${id}`})
        }
        await Task.findByIdAndDelete(id)
        const newDataTask= await Task.find();
        res.json({
            message: "Success Delete Job",
            newData: newDataTask,
          });
    }catch (error) {
        res.status(500).send({message:error.message})
    }   
})
// mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://phuclethinh70:faXqol8PJnw6j9JV@cluster0.rlqqud3.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(4000,()=>{
        console.log('API is listening on port 4000')
    })
}).catch((error)=>{
    console.log(error)
})