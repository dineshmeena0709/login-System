import React from 'react'
import { useState } from 'react';
import "../App.css"

// import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer} from "react-toastify"
import { IoPerson } from "react-icons/io5";
import { IoMail } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { handleError, handleSuccess } from '../utils';

const Register = () => {

    const [signupInfo, setSignupInfo] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:''
    })

     const navigate = useNavigate()
    const handlechange = (e)=>{
        const { name, value}= e.target;
        console.log(name,value)
        const copySignupInfo = {...signupInfo}
        copySignupInfo[name]=value
        setSignupInfo(copySignupInfo)
    }
    console.log('loginInfo ->',signupInfo)


    const handleSignup = async(e)=>{
        e.preventDefault()
        const {firstName,lastName,email,password}= signupInfo
        if(!firstName || !lastName || !email || !password){
          return handleError(" firstName, lastName, email and password are required")  
        }
        try {
            const url = "http://localhost:8080/auth/signup"
            // const url = "http://localhost:5252/api/auth/signup"
            const response = await fetch(url,{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(signupInfo)
            })
            const result = await response.json();
            const {success, message,error}= result;
            if(success){
                handleSuccess(message)
                setTimeout(()=>{
                   navigate('/Signin') 
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
         
      <div className="container " id="signUp"  >
    
        <h1 className="form-title">Register</h1>
        <form onSubmit={handleSignup}  >
            <div className="input-group">
            <i className="fas fa-user">
            <IoPerson/>
            </i>
            <input type="text" name="firstName"  id="firstName" value={signupInfo.firstName} onChange={handlechange} autoFocus placeholder="First name"  required/>
            <label for="firstName">First Name</label>
        </div>
            <div className="input-group">
                <i className="fas fa-user">
                <IoPerson/>
                </i>
            <input type="text" name="lastName" id="lastName" onChange={handlechange} value={signupInfo.lastName} autoFocus placeholder="Last name"  required />
                <label for="lastName">Last name</label>
            </div>
                <div className="input-group">
                    <i className="fas fa-enveloep">
                    <IoMail />
                    </i>
                    <input type="email" onChange={handlechange} value={signupInfo.email} name="email" autoFocus id="email" placeholder=" Email"  required/>
                    <label for="email">Email</label>
                </div>
                    <div className="input-group">
                        <i className="fas fa-lock">
                        <FaLock />
                        </i>
                        <input type="password" name='password' onChange={handlechange } value={signupInfo.password} autoFocus  id="password"   placeholder="password"  />
                        <label for="password">Password</label>
                    </div>
                   
                    <input type="submit" className="btn"   value="Sign Up" name="Sign Up"/>
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
                        <p>Already Have Account ?</p>
                        <Link to="/Signin"><button   id="signInButton">Sign In</button></Link>
                    </div>

                    <ToastContainer/>

    </div>
    </div>
  )
}

export default Register
