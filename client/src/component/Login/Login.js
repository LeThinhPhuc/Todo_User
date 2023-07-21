import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import './Login.css'
const Login=()=>{
    const navigate=useNavigate()
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const handleAddLogin = async ()=>{
        try{
            if(email&&password){
                const user= await authService.logIn({email:email,password:password})
                localStorage.removeItem('user');

                localStorage.setItem('user', JSON.stringify(user.data));

                console.log(user)
                navigate("/task")
            }
        } catch(e){
            console.log(e);
        }
    }
    return(
        <div style={{alignItems:"center", justifyContent:"center", display:"flex", flexDirection:"column"}}>
            <h1>LOGIN</h1>

            <div style={{justifyContent:"space-between",alignItems:"center", position: 'relative', marginTop:"20px",display:"flex" }}>
  <label >Email</label>
  <input onChange={(e) => setEmail(e.target.value)} type="text"  />
</div>


      <div style={{justifyContent:"space-between",alignItems:"center", position: 'relative', marginTop:"20px",display:"flex" }}>
        <label>Password</label>
        <input onChange={(e)=>setPassword(e.target.value)} type="password"></input>


      </div>
      <button style={{padding:"10px", marginTop:"15px", marginBottom:"15px"}} onClick={handleAddLogin}>Login</button> <buton style={{color:"red"}} onClick={()=> navigate("/register")}>Register</buton>

        </div>
    )
}
export default Login;