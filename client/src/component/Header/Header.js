import { useNavigate } from "react-router-dom";
const Header=()=>{


    // NẾU LỖI POST TASK THÌ LỖI Ở ĐÂY 
    
let tmpData = JSON.parse(localStorage.getItem("user"));

    const navigate = useNavigate();
    return (
        
        <div style={{color:"green", fontWeight:"bold", fontSize:"30px", display:"flex", justifyContent:"space-between"}}>
            ToDoList's {tmpData?.username?.toUpperCase()}

            <button style={{borderBottomRightRadius:"70%", borderTopRightRadius:"70%", padding:"10px", marginTop:"8px"}} onClick={()=>{navigate('/'); window.localStorage.clear()}}>Logout</button>
        </div>
    )
}
export default Header;