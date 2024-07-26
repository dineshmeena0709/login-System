import React, { useRef, useEffect, useState } from 'react';
import "../App.css";
import { useNavigate } from 'react-router-dom';
import { IoPerson, IoMail } from "react-icons/io5";
import Avtar from "../assist/Avatar.png";
import {ToastContainer} from "react-toastify"
import { handleError, handleSuccess } from '../utils';

const UpdateProfile = () => {
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
  });
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
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
        setForm({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          bio: data.bio,
          image:data.image
        });
        setImage(data.image); // Set image URL from response
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
        const formData = new FormData();
        formData.append('firstName', form.firstName);
        formData.append('lastName', form.lastName);
        formData.append('bio', form.bio);
        if (inputRef.current.files[0]) {
            formData.append('image', inputRef.current.files[0]);
        }

        const response = await fetch('http://localhost:8080/update', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Update failed");
        }
        const result = await response.json();
        

        const {success, message, error}= result;
        if(success){
          handleSuccess(message)
         
          setTimeout(()=>{
             navigate('/Mainpage') 
          },2000)
      }else if(error){
          const details= error?.details[0].message;
          handleError(details);
      }else if(!success){
          handleError(message)
      }
     
    } catch (error) {
        setError(error.message);
    }
};


  return (
    <div>
      <div className="container" id="signUp">
        <h1 className="form-title">Update</h1>
        {error && <p className='error'>{error}</p>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="profile" onClick={handleImageClick}>
            {image ? <img src={image} alt="avatar" /> : <img src={Avtar} alt="avatar" />}
            <input type="file" ref={inputRef} name="image" onChange={handleImageChange} style={{ display: "none" }} />
          </div>

          <div className="input-group">
            <i className="fas fa-user">
              <IoPerson />
            </i>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First name"
            />
            <label htmlFor="firstName">First Name</label>
          </div>

          <div className="input-group">
            <i className="fas fa-user">
              <IoPerson />
            </i>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last name"
            />
            <label htmlFor="lastName">Last Name</label>
          </div>

          <div className="input-group">
            <i className="fas fa-envelope">
              <IoMail />
            </i>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              disabled
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="input-group">
            <input
              type="text"
              name="bio"
              id="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Bio"
            />
            <label htmlFor="bio">Bio</label>
          </div>

          <input type="submit" className="btn" value="Update Profile" />
        </form>
        <ToastContainer/>
      </div>
    </div>
  );
}

export default UpdateProfile;
