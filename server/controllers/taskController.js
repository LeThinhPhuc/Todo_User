const Task=require('../models/taskModel');
const User=require('../models/userModel');
// const { LocalStorage } = require('node-localstorage');
// const localStorage = new LocalStorage('./scratch');
const taskController = {
    getAll: async (req,res)=>{
        // try{
        //     const user=await User.findOne(req.body.username);
            
        //      res.status(200).json(user.todos);
        // } catch(e){
        //     res.status(500).json(e);
        // }
        try {
            console.log(req.params.email);
            const email= req.params.email;
            const user = await User.findOne({email: email}).populate('todos');
            console.log(user.todos);
            res.status(200).json(user.todos);
          } catch (e) {
            res.status(500).json(e);
          }
    },
    getById: async (req, res) => {
        const taskId = req.params.id; // Lấy ID công việc từ URL
    
        try {
            const email= req.params.email;

          const user =await User.findOne({email:email}).populate('todos');

          const index = user.todos.findIndex((item)=>item._id.toString()===taskId)
          if(index!==-1){
            console.log("user index ne :",user.todos[index])
            return res.json(user.todos[index])
          }

        //   if(index!==-1){
        //     user.todos[index].name = req.body.name;
        //     user.todos[index].leftDate = req.body.leftDate;
        //     await user.save();
        //   }


//           const task = await Task.findById(taskId);

//           if (!task) {
//             return res.status(404).json({ message: 'Công việc không tồn tại' });
//           }
    
// if(user.todos.includes(task._id)){
//     await Task.findById();
//     const newDataTask = await Task.findById(taskId)
//     res.json({
//         message:"Successfully ",
//         newData: newDataTask,
//     })
// }

          //res.status(200).json(task);
        } catch (error) {
            if (error.code === 'ECONNABORTED') {
                // Xử lý lỗi timeout
                console.log('Request timeout');
              } else {
                // Xử lý các lỗi khác
                console.error(error);
              }
        }
      },

        postTask: async (req, res) => {
            try{
                // const job=new Task(req.body);
                // await job.save();

                // const newDataJob = await Task.find();

                // res.json({
                //     message:"Success Add Task",
                //     newData: newDataJob,
            // })
                const task=new Task({name:req.body.name, leftDate:req.body.leftDate});

                await task.save();
                const user =await User.findOne({email:req.body.email}).populate('todos');;
                console.log("task trc khi push : ", task)
                user.todos.push(task);
                console.log("todos trc khi push : ", user)

                await user.save();

                const newDataTask = await Task.find()

                res.json({
                    message:"Success Add Task",
                    newData: user.todos,
                })
            }catch (e) {
                res.status(500).json(e)
            }
        },

    // updateTaskById: async (req,res) =>{
    //     try{
    //         // const {id} = req.params;
    //         // const task = await Task.findByIdAndUpdate(id,req.body)
    //         // if(!task){
    //         //     return res.status(404).json({message: `cannot find any product with ID ${id}`})
    //         // }
    //         // await Task.findByIdAndUpdate(id, req.body)
    //         // const newDataTask = await Task.find();

    //         // res.json({
    //         //     message :"Success Update",
    //         //     newData:newDataTask,
    //         // })

    //         const {id} = req.params;

    //         const user =await User.findOne({email:req.body.email});

    //         const index = user.todos.findIndex((item)=>item._id.toString()===id)
    //         // if(index!==-1){
    //         //   return res.json(user.todos[index])
    //         // }
  
    //         if(index!==-1){
    //           user.todos[index].name = req.body.name;
    //           user.todos[index].leftDate = req.body.leftDate;
    //           await user.save();
    //           return res.json(user.todos)
    //         }
  

    //         // const task = await Task.findById(id);

    //         // if(!task){
    //         //     return res.status(404).json({message:`Task not found`})

    //         // }


    //         // if(user.todos.includes(task._id)){
    //         //     await Task.findByIdAndUpdate(id, req.body)

    //         //     const newDataTask = await Task.find();

    //         //     res.json({
    //         //         message :"Success Update",
    //         //         newData:newDataTask,
    //         //     })
    //         // }else{
    //         //     return res.status(404).status({message :"Unauthorized access to task"})
    //         // }
    //     } catch (error) {
    //         if (error.code === 'ECONNABORTED') {
    //             // Xử lý lỗi timeout
    //             console.log('Request timeout');
    //           } else {
    //             // Xử lý các lỗi khác
    //             console.error(error);
    //           }
    //     }
    // },
    updateTaskById: async (req, res) => {
        try {
          const { id } = req.params;
      
          const user = await User.findOne({ email: req.body.email }).populate('todos');
      
          const index = user.todos.findIndex((item) => item._id.toString() === id);
      
          if (index !== -1) {
            user.todos[index].name = req.body.name;
            user.todos[index].leftDate = req.body.leftDate;
            await user.save();
            await Task.findByIdAndUpdate(id,{name:req.body.name, leftDate:req.body.leftDate})
            // console.log("update ne : ",user)
            return res.json(user.todos);
          } else {
            return res.status(404).json({ message: "Task not found" });
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Internal server error" });
        }
      },
      
      deleteTaskById: async (req, res) => {
        try {
          const id = req.params.id;
          const email = req.params.email;
      
          const user = await User.findOne({ email });
      
          const task = await Task.findById(id);
      
          if (!task) {
            return res.status(404).json({ message: "Cannot find task" });
          }
      
          if (user.todos.includes(task._id)) {
            await Task.findByIdAndDelete(id);
      
            // Lấy danh sách todos mới của user
            const updatedUser = await User.findOne({ email }).populate("todos");
      
            res.json({
              message: "Success Delete Task",
              newData: updatedUser.todos,
            });
          } else {
            return res.status(404).json({ message: "Unauthorized access to task" });
          }
        } catch (e) {
          res.status(500).json(e);
        }
      },
      
      
}

module.exports = taskController;