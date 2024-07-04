import React from 'react'
import "../App.css"
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleSuccess } from '../utils'

const Mainpage = () => {
const [loggedInUser, setloggedInUser] = useState('')
const navigate= useNavigate()

useEffect(() => {
setloggedInUser(localStorage.getItem('loggedInUser'))
}, [])

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
      <h1>Hello {loggedInUser} Welcome  </h1>
      <div onClick={handleLogout} className="button">Logout</div>
    <ToastContainer/>
    </div>
  )
}

export default Mainpage
