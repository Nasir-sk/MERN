import React,{useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
const SignUp =()=>{
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const navigate = useNavigate()
    
    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth){
            navigate('/')
        }
    })
    const collectData= async()=>{
        console.log(name, email, password)
        let result = await fetch('http://localhost:5000/register',{
            method:'post',
            body: JSON.stringify({name,email,password}),
            headers:{'Content-Type':'application/json'}
        })
        result = await result.json();
        console.warn(result)
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate('/')       // if user authed then it ll b redirected in if navigate is not define in this line then signup page still appear if it defined it ll b redirected 
        // if(result){
        //     navigate('/');
        // }
    }
    return(
        <div className="register">
            <h3>Register</h3>
            <input className="inputbox" type="text" onChange={(e)=>setName(e.target.value)} value={name} placeholder="Enter Name" />
            <input className="inputbox" type="text"  onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Enter Email" />
            <input className="inputbox" type="password"  onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Enter Password" />
            <button className="appbutton" onClick={collectData} >Sign Up</button>
        </div>
    )
}
export default SignUp;