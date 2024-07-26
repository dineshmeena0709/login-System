import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../utils';
import Avtar from "../assist/Avatar.png";
import "../App.css";
import "../conmponents/Page.css";

const Mainpage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:8080/get', {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.log('Error fetching user:', error);
        
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      handleSuccess('User logged out');
      setTimeout(() => {
        navigate("/Signin");
      }, 1500);
    }
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className='homepage'>
      <div className="profile" style={{ width: "100px" }}>
        <Link to="/UpdateProfile">
          <img 
            src={user.image || Avtar} // Default to Avtar if user.image is not available
            alt="avatar" 
            onError={(e) => {
              e.target.src = Avtar;
              console.log(user.image);
            }} 
          />
        </Link>
      </div>

      <h1>Hello {user.firstName}, Welcome!</h1>
      <div onClick={handleLogout} className="button">Logout</div>
      <ToastContainer />
    </div>
  );
}

export default Mainpage;
