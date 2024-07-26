import React, { useRef, useState } from 'react';
import "../App.css";
import { useNavigate } from 'react-router-dom';
import { IoPerson } from "react-icons/io5";
import { IoMail } from "react-icons/io5";
import Avtar from "../assist/Avatar.png";

const Updatepage = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [image, setImage] = useState(null); 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bio: ''
  });

  const handleImageClick = (currentUser) => {
    inputRef.current.click();
    setFormData(currentUser)
  };
 


  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const formDataWithFile = new FormData();
      formDataWithFile.append('firstName', formData.firstName);
      formDataWithFile.append('lastName', formData.lastName);
      formDataWithFile.append('bio', formData.bio);
      formDataWithFile.append('pic', image); 

      const response = await fetch('http://localhost:8080/update', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formDataWithFile
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      console.log('Profile update response:', data);
      alert('Profile updated successfully');
      navigate("/Mainpage");
    } catch (error) {
      console.error('Profile update error:', error.message);
      alert('Failed to update profile');
    }
  };

  return (
    // <div>
    //   <div className="container" id="signUp">
    //     <h1 className="form-title">Update</h1>
    //     <form onSubmit={handleSubmit} encType="multipart/form-data">

    //       <div className="profile" onClick={handleImageClick}>
    //         {image ? <img src={URL.createObjectURL(image)} alt="avatar" /> : <img src={Avatar} alt="avatar" />}
    //         <input type="file" ref={inputRef} id="pic" name="pic" onChange={handleImageChange} style={{ display: "none" }} />
    //       </div>

    //       <div className="input-group">
    //         <i className="fas fa-user">
    //           <IoPerson />
    //         </i>
    //         <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} autoFocus placeholder="First name" />
    //         <label htmlFor="firstName">First Name</label>
    //       </div>
    //       <div className="input-group">
    //         <i className="fas fa-user">
    //           <IoPerson />
    //         </i>
    //         <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} autoFocus placeholder="Last name" />
    //         <label htmlFor="lastName">Last name</label>
    //       </div>
    //       <div className="input-group">
    //         <i className="fas fa-envelope">
    //           <IoMail />
    //         </i>
    //         <input type="email" name="email" autoFocus id="email" placeholder="Email" disabled  />
    //         <label htmlFor="email">Email</label>
    //       </div>
    //       <div className="input-group">
    //         <input type="text" name="bio" autoFocus id="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />
    //         <label htmlFor="bio">Bio</label>
    //       </div>

    //       <input type="submit" className="btn" value="Update Profile" />
    //     </form>
    //   </div>
    // </div>














    <div>
      <div className="container" id="signUp">
        <h1 className="form-title">Update</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">

          <div className="profile" onClick={handleImageClick}>
            {image ? <img src={URL.createObjectURL(image)} alt="avatar" /> : <img src={Avtar} alt="avatar" />}
            <input type="file" ref={inputRef} id="pic" name="pic" onChange={handleImageChange} style={{ display: "none" }} />
          </div>

          <div className="input-group">
            <i className="fas fa-user">
              <IoPerson />
            </i>
            <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} autoFocus placeholder="First name" />
            <label htmlFor="firstName">First Name</label>
          </div>
          <div className="input-group">
            <i className="fas fa-user">
              <IoPerson />
            </i>
            <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} autoFocus placeholder="Last name" />
            <label htmlFor="lastName">Last name</label>
          </div>
          <div className="input-group">
            <i className="fas fa-envelope">
              <IoMail />
            </i>
            <input type="email" name="email" autoFocus id="email" placeholder="Email" disabled  />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-group">
            <input type="text" name="bio" autoFocus id="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />
            <label htmlFor="bio">Bio</label>
          </div>

          <input type="submit" className="btn" value="Update Profile" />
        </form>
      </div>
    </div>
  
  );
}

export default Updatepage;
