import React, {useState} from "react";
import authService from "../../services/authService";
import {useNavigate} from "react-router-dom"
const Register=()=>{
    const [username, setUsername] =useState();
    const [email, setEmail] =useState();
    const [password, setPassword] =useState();
    const [note, setNote] =useState();
    const navigate = useNavigate();
    const handleAddRegister = async ()=>{
        try{
            if(username&&email&&password){
                const newUser = await authService.register({username:username, email:email, password:password})
                console.log("newuser ne : ",newUser)
                setNote(newUser?.data?.message)

                
                setEmail(""); setPassword(""); setUsername("");
                if(newUser?.data?.message){

                }else{
                    navigate('/')
                }
            }
        }catch(e){
            console.log(e);
        }
       
    }
    return(
        <div style={{alignItems:"center", justifyContent:"center", display:"flex", flexDirection:"column"}}>
            <h1>REGISTER</h1>
           
            <div style={{position: 'relative', marginTop:"40px" }}>
        <label>Username</label>
        <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text"></input>

      </div>

      <div style={{position: 'relative', marginTop:"40px" }}>
        <label>Email</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text"></input>

      </div>

          <div style={{position: 'relative', marginTop:"40px" }}>
        <label>Password</label>
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password"></input>

      </div> 
            <button style={{marginTop:"15px", marginBottom:"15px", padding:"10px"}} onClick={handleAddRegister}>Register</button>
            <buton style={{color:"red"}} onClick={()=> navigate("/")}>Login</buton>
            <h1>{note}</h1>
        </div>
    )
}
export default Register;