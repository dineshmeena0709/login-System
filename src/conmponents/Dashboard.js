import React from 'react'
import "../App.css"
import "../conmponents/Page.css"
import { useEffect,useState } from 'react'
import { useNavigate ,Link } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleSuccess } from '../utils'
import Avtar from "../assist/Avatar.png"
import  getUserProfile  from '../services/profileService'

const Mainpage = () => {
const [loggedInUser, setloggedInUser] = useState("")
const navigate= useNavigate()


    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const profile = await getUserProfile(); // Use getUserProfile function
            setloggedInUser(profile);
          } catch (error) {
            // Handle error fetching user profile
            console.error('Error fetching user profile:', error.message);
          }
        };
    
        fetchUserProfile();
      }, []);


const handleLogout=(e)=>{
  localStorage.removeItem('token');
  localStorage.removeItem('logggedInUser')
  handleSuccess('User loggedout')
  setTimeout(() => {
    navigate("/Signin")
    
  }, 1500);
 
}
  return (
    <div className='homepage'>
      
      <div className="profile" style={{"width":"100px"}}>
<Link to="/Updatepage"><img src={Avtar} alt="avtar" />
              <input style={{"display":"none"}} type="file" id='profile' name='profile'/></Link>
              
            </div>

         
      {loggedInUser && (<h1>Hello {loggedInUser.firstName} {loggedInUser.lastName}Welcome  </h1>)}
      <div onClick={handleLogout} className="button">Logout</div>
    <ToastContainer/>
    </div>
  )
}

export default Mainpage
