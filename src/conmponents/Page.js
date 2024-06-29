import React from 'react'
import '../conmponents/Page.css'
import { IoPerson } from "react-icons/io5";
import { IoMail } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useState } from 'react';


const Page = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const showSignUpForm = () => {
        setIsSignUp(true);
      };
    
      const showSignInForm = () => {
        setIsSignUp(false);
      };


  return (
    <div>
      
      <div className="container " id="signUp" style={{ display: isSignUp ? 'block' : 'none' }}>
        <h1 className="form-title">Register</h1>
        <form action="" method="post">
            <div className="input-group">
            <i className="fas fa-user">
            <IoPerson/>
            </i>
            <input type="text" name="fname" id="Fname" placeholder="First name" required/>
            <label for="fname">First Name</label>
        </div>
            <div className="input-group">
                <i className="fas fa-user">
                <IoPerson/>
                </i>
                <input type="text" name="lname" id="lname" placeholder="Last name" required />
                <label for="lname">Last name</label>
            </div>
                <div className="input-group">
                    <i className="fas fa-enveloep">
                    <IoMail />
                    </i>
                    <input type="email" name="email" id="email" placeholder=" Email" required/>
                    <label for="email">Email</label>
                </div>
                    <div className="input-group">
                        <i className="fas fa-lock">
                        <FaLock />
                        </i>
                        <input type="password" id="password" placeholder="password" required/>
                        <label for="password">Password</label>
                    </div>

                    <input  type="submit" className="btn" value="Sign Up" name="Sign Up"/>
        </form>
                    
                    <p className="or">
                        --------or--------
                    </p>
                    <div className="icons">
                        <i className="fab fa-google"><FcGoogle />
                        </i>
                        <i className="fab fa-facebook"><BsFacebook />
                        </i>
                    </div>
                    <div className="links">
                        <p>Already Have Account ?</p>
                        <button onClick={showSignInForm} id="signInButton">Sign In</button>
                    </div>

    </div>

    <div className="container" id="signIn" style={{ display: !isSignUp ? 'block' : 'none' }}>
        <h1 className="form-title">Sign In</h1>
        <form action="" method="post">
          
                <div className="input-group">
                    <i className="fas fa-envelope">
                    <IoMail />
                    </i>
                    <input type="text" name="email" id="email" placeholder=" Email" required/>
                    <label for="email">Email</label>
                </div>
                    <div className="input-group">
                        <i className="fas fa-lock">
                        <FaLock />
                        </i>
                        <input type="password" id="password" placeholder="password" required/>
                        <label for="password">Password</label>
                    </div>
                    <p className="recover">
                        <a href="#">Recover Password</a>
                    </p>

                    <input type="submit" className="btn" value="Sign In" name="SignIn"/>
        </form>
                    
                    <p className="or">--------or--------</p>
                    <div className="icons">
                        <i className="fab fa-google"><FcGoogle />
                        </i>
                        <i className="fab fa-facebook"><BsFacebook />
                        </i>
                    </div>
                    <div className="links">
                        <p>Don't  have account yet ?</p>
                        <button onClick={showSignUpForm} id="signUpButton">Sign Up</button>
                    </div>

    </div>

    
    </div>
  )
}

export default Page
