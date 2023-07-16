import React, {useState, useEffect} from 'react';
import { differenceInDays, parse } from 'date-fns';
// import uuid4 from "uuid4";
import Item from '../Item/Item';
import taskService from '../../services/taskService';
import './Body.css';

let tmpData = JSON.parse(localStorage.getItem("user"));

const Body = () => {
  const [task,setTask]=useState();
  const [date,setDate]=useState();
  const [day,setDay]=useState();
  const [tasks, setTasks] = useState([]);
  
const fetchUser = async () => {
  try {
    // console.log({email: tmpData.email, username: tmpData.username})
    const userResponse = await taskService.getAll({email: tmpData.email, username: tmpData.username});
    // const userData = userResponse.newData;
    console.log("User data:", userResponse);
    setTasks(userResponse.data)
  } catch (error) {
    console.log(error);
  }
};
// async function logJSONData() {
//   const response = await fetch("http://localhost:4000/task");
//   const jsonData = await response.json();
//   console.log(jsonData);
// }

useEffect(()=>{
  
  fetchUser();
  // logJSONData();
  // axios.get('http://localhost:4000/task')
  // .then(response => {
  //   console.log(response)
  // })
  // .catch(error => {
  //   console.log(error);
  // });

},[])
  // const handleAdd = ()=>{
  //   if(task&&date){
  //     // setTasks([...tasks,{id:uuid4(),name:task, leftDate:date}])

  //     setTask("");
  //     setDay("")
  //     // localStorage.setItem("works", JSON.stringify(tasks))
  //   }
  //   }

    const handleAdd = async () =>{
      try{
        if(task&&date){
          // let tmpData = await JSON.parse(localStorage.getItem("user"));
          // console.log({...tmpData, task:task, date:date})
          const newList= await taskService.postTask({...tmpData,name:task,leftDate:date})
          console.log("newlist", newList.data.newData);
          setTasks(newList.data.newData);
          console.log("Tasks la :", typeof tasks)
          setTask("");
      setDay("")
        }
      }catch(error){
        console.log(error);
      }
    }
    const calculateDays = (endDate) => {
      // Chuyển đổi ngày tháng năm bắt đầu và kết thúc thành đối tượng Date
      const currentDate = new Date();
      let currentDay = currentDate.getDate();
      const currentMonth = currentDate.getMonth() + 1; // Month là 0-indexed, cần cộng thêm 1
      const currentYear = currentDate.getFullYear();
      if (currentDay < 10) {
          currentDay = "0" + currentDay;
      }
      let tha;
      if (currentMonth < 10) {
          // setThang("0"+currentMonth)
          tha = "0" + currentMonth
      } else {
          // setThang(currentMonth)
          tha = currentMonth
      }
      const start = parse(currentYear + "-" + tha + "-" + currentDay, 'yyyy-MM-dd', new Date());
      const end = parse(endDate, 'yyyy-MM-dd', new Date());
      // Tính số ngày giữa hai ngày bằng hàm differenceInDays
      const days = differenceInDays(end, start);

      // Trả về số ngày
      return days.toString();
  };
  const handleDelete = async (t) => {
    // let tmp = [...tasks];
    // for(let i=0;i<tmp.length;i++) {
    //   if(t==tmp[i].id){
    //     tmp.splice(i, 1);
    //   }
    // }

    const newList= await taskService.DeleteById(t,  {email: tmpData.email, username: tmpData.username});

  console.log("delete :",newList.data.newData)
    setTasks(newList.data.newData);
   
    // localStorage.setItem("works", JSON.stringify(tasks))

  };
  const handleEdit = async (i, x, y) => {
  
    //  const newTasks= tasks.map(item=>{
    //   if(item.id==i){
    //     return {...item,name:x, leftDate:y?y:item.leftDate};
    //   }
    //   return item;
    //  })
      const tmpTask=await taskService.getById(i, {email: tmpData.email, username: tmpData.username});
      console.log("tmp update ne : ", tmpTask)
      const newList = await taskService.UpdateById(i,{email:tmpData.email,name:x,leftDate:y?y:tmpTask.data.leftDate});
console.log(newList.data);
     setTasks(newList.data);

  };
    return (
        <div>
      <div style={{justifyContent:"space-between",alignItems:"center", position: 'relative', marginTop:"20px",display:"flex" }}>
        <label>Your task</label>
        <input value={task} type="text" onChange={(e)=>{setTask(e.target.value); console.log(task)}}/>
      <input onChange={(e)=>{setDay(e.target.value);setDate(calculateDays(e.target.value)); console.log(date)}} value={day} type="date" />
      </div>
      <div style={{margin:"0 auto",display:'flex', justifyContent:"space-around", width:"40%", marginTop:"20px"}}>
      <button onClick={handleAdd}>ADD</button>
      </div>

      {
  Array.isArray(tasks) &&
  tasks.map((item) => {
    return <Item cal={calculateDays} key={item._id} name={item.name} id={item._id} leftDate={item.leftDate} edit={handleEdit} delete={handleDelete} />;
  })
}


      </div>
    );
  };  
export default Body;