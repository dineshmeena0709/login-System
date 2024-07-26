import React from 'react'
import { useState } from 'react';
import "../App.css"

import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer} from "react-toastify"
import { IoMail } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { handleError, handleSuccess } from '../utils';

const Signin = () => {

    
    const [loginInfo, setLoginInfo] = useState({
        email:'',
        password:''
    })

     const navigate = useNavigate();

    const handlechange = (e)=>{
        const { name, value}= e.target;
        console.log(name,value)
        const copyloginInfo = {...loginInfo}
        copyloginInfo[name]=value
        setLoginInfo(copyloginInfo)
    }
    console.log('loginInfo ->',loginInfo)


    const handleLogin = async(e)=>{
        e.preventDefault()
        const error = " email and password are required"
        const {email,password }= loginInfo
        if( !email || !password){
            return handleError(error)  
        }
        try {
            // const url = "http://localhost:1000/api/users/login"
            const url = "http://localhost:8080/login"
            // const url = "http://localhost:5252/api/auth/login"
            const response = await fetch(url,{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(loginInfo)
            })
            const result = await response.json();
            const {success, message, jwtToken, email, error}= result;
            if(success){
                handleSuccess(message)
                localStorage.setItem("token", jwtToken);
                localStorage.setItem("loggedInUser", email)
                setTimeout(()=>{
                   navigate('/Mainpage') 
                },2000)
            }else if(error){
                const details= error?.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(message)
            }
            console.log(result)
        } catch (err) {
            handleError(err)
        }
    }

 

  return (
    <div>
         
      <div className="container " id="SingIn"  >
    
        <h1 className="form-title">Login to Your Account</h1>
        <form onSubmit={handleLogin} >
          
                <div className="input-group">
                    <i className="fas fa-enveloep">
                    <IoMail />
                    </i>
                    <input type="email" name="email" onChange={handlechange} value={loginInfo.email} id="email" placeholder=" Email"  required/>
                    <label htmlFor="email">Email</label>
                </div>
                    <div className="input-group">
                        <i className="fas fa-lock">
                        <FaLock />
                        </i>
                        <input type="password" name='password' onChange={handlechange} value={loginInfo.password}   id="password"   placeholder="password" />
                        <label htmlFor="password">Password</label>
                    </div>
                    <p className="recover">
                        <Link href="#">Recover Password</Link>
                    </p>

                  
                    <input  type="submit" className="btn"  value="Sign In" name="Sign Up"/>
        </form>
                    
                    <p className="or">
                        --------or--------
                    </p>
                    <div className="icons">
                        <i className="fab fa-google">
                            
                            
                            <FcGoogle />
                        </i>
                        <i className="fab fa-facebook">
                            <BsFacebook />
                        </i>
                    </div>
                    <div className="links">
                        <p>Don't have account yet ?</p>
                        <Link to="/Register"><button   id="signInButton">Sign In</button></Link>
                    </div>
                    <ToastContainer/>

    </div>
    </div>
  )
}

export default Signin
