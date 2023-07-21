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
  const [page,setPage] = useState();
  const [tasks, setTasks] = useState([]);
  const [pageDa,setPageDa] = useState([]);
const fetchUser = async () => {
  try {
    // console.log({email: tmpData.email, username: tmpData.username})
    const userResponse = await taskService.getAll({email: tmpData.email, username: tmpData.username, page:page?page:1});
    // const userData = userResponse.newData;
    console.log("User data:", userResponse);
    setTasks(userResponse.data.allData)
    setPageDa(userResponse.data.pageData)
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

},[page])
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
        if(Number(date)<0){
          alert("Date is wrong !")
        }else{
          const newList= await taskService.postTask({...tmpData,name:task,leftDate:date, page:page?page:1})
          console.log("newlist", newList.data.newData);
          setTasks(newList.data.newData);
    setPageDa(newList.data.pageData)

          console.log("Tasks la :", typeof tasks)
          setTask("");
      setDay("")
        }
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

    const newList= await taskService.DeleteById(t,  {email: tmpData.email, username: tmpData.username, page:page?page:1});
// setPage(1)
  // console.log("delete :",newList.data.newData)
    setTasks(newList.data.newData);
    // setPageDa(newList.data.pageData)
    fetchUser();
    // setPage(1)
    // localStorage.setItem("works", JSON.stringify(tasks))

  };
  const handleEdit = async (i, x, y) => {
  
    //  const newTasks= tasks.map(item=>{
    //   if(item.id==i){
    //     return {...item,name:x, leftDate:y?y:item.leftDate};
    //   }
    //   return item;
    //  })
    console.log(tmpData)
      // const tmpTask=await taskService.getById(i, {email: tmpData.email, username: tmpData.username});
      // console.log("tmp update ne : ", tmpTask)
    let dateTmp
      for(let z=0;z<pageDa.length;z++) {
        if(pageDa[z]._id==i){
          dateTmp=pageDa[z].leftDate
        }
      }
      const newList = await taskService.UpdateById(i,{page:page?page:1, email:tmpData.email,name:x,leftDate:y?y:dateTmp});
// console.log(newList.data);
     setTasks(newList.data.newData);
     setPageDa(newList.data.pageData)

  };





let n = tasks.length;
let num
let arr=[]
if(n%3===0){
  
  if(n===0){
    num=0
  }else{
    num=n/3
    console.log("so trang :",num)

  }
}else{
  if(n<3){
    num=1
    console.log("so trang :",num)

  }else{
    num=Math.floor(n/3)+1;
  }

}

for(let i=1;i<=num;i++){
  arr.push(i);
}
    return (
        <div>
      <div className='main' style={{justifyContent:"space-between",alignItems:"center", position: 'relative', marginTop:"20px",display:"flex" }}>
        <label>Your task</label>
        <input className='main-input' value={task} type="text" onChange={(e)=>{setTask(e.target.value); console.log(task)}}/>
      <button className='button-add' onClick={handleAdd}>ADD</button>
      <input className='main-input' onChange={(e)=>{setDay(e.target.value);setDate(calculateDays(e.target.value)); console.log(date)}} value={day} type="date" />
      </div>
      

      {
  Array.isArray(pageDa) &&
  pageDa.map((item) => {
    return <Item cal={calculateDays} key={item._id} name={item.name} id={item._id} leftDate={item.leftDate} edit={handleEdit} delete={handleDelete} />;
  })

}
<div style={{padding:"10px"}}></div>
{/* <div dangerouslySetInnerHTML={{ __html: slideNumber() }} /> */}


  {
    arr.map((item)=>{
      return <span onClick={()=>{setPage(item); console.log("page ne : ", page)}} style={{padding:"10px"}}>{item}</span>
    })
  }
    
      </div>
    );
  };  
export default Body;