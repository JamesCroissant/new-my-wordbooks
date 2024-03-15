import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Profile.css";
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';
import { User } from '../../types';


const Profile = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AuthContext);
  const [editedUser, setEditedUser] = useState<User>({
    _id: state.user?._id,
    username: state.user?.username,
    email: state.user?.email,
    password: state.user?.password,
    isAdmin: state.user?.isAdmin
  });
  const [isEditing, setIsEditing] = useState(false);
  const baseURL = "https://new-my-wordbooks.onrender.com"

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    if (!editedUser) return;
    try {
      await axios.put(`${baseURL}/api/users/${editedUser._id}`, editedUser);
      dispatch({
        type: 'UPDATE_USER',
        payload: editedUser
      })
      localStorage.setItem('user', JSON.stringify(editedUser));
      alert('User info updated successfully!');
      setIsEditing(false);
    } catch (err) {
      console.log("fail to update data", err);
      alert('Failed to update user info.');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Do you really want to delete user information?");
    if (confirmDelete) {
      try {
        await axios.delete(`${baseURL}/user/${editedUser._id}`);
        dispatch({
          type: 'DELETE_USER',
        });
        console.log('User deleted successfully');
        localStorage.removeItem('user');
        navigate("/");
      } catch (err) {
        console.error('Failed to delete user', err);
      }
    }
  }
  

  return (
    <div>
      <div className="container mt-5">
        <div className="profileTop text-center">
          <h2 className="profileTitle display-5 fw-bold mb-7">Profile</h2>
        </div>

        {isEditing ? (
          <form className="profileBox">
            <div className="mb-3 col-10 mx-auto">
              <label htmlFor="exampleInputUsername" className="form-label profile-title">UserName</label>
              <input 
                type="username" 
                className="form-control custom-input" 
                id="editInputUsername"
                aria-describedby="usernameHelp"
                required
                value={editedUser.username || ""}
                onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
              />
            </div>
            <div className="mb-3 col-10 mx-auto">
              <label htmlFor="exampleInputEmail1" className="form-label profile-title">Email address</label>
              <input 
                type="email" 
                className="form-control custom-input" 
                id="editInputEmail" 
                aria-describedby="emailHelp"
                required
                value={editedUser.email || ""}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
              />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="d-grid justify-content-center text-center">
              <button 
                type="button" 
                className="profileUpdateButton btn btn-danger my-3 col-1.8 mx-auto" 
                onClick={handleUpdate}
              >Update</button>
            </div>
          </form>
        ) : (
          <form className="profileBox" >
            <div className="mb-4 col-10 mx-auto">
              <label htmlFor="exampleInputUsername" className="form-label profile-title">UserName</label>
              <p className="display-6">{ state.user?.username }</p>
            </div>
            <div className="mb-4 col-10 mx-auto">
              <label htmlFor="exampleInputEmail1" className="form-label profile-title">Email address</label>
              <p className="display-6">{ state.user?.email }</p>
            </div>
            <div className="d-grid justify-content-center text-center">
              <button 
                type="button" 
                className="profileRegisterButton btn btn-success my-3 col-1.8 mx-auto" 
                onClick={handleEdit}
              >Edit</button>
            </div>
            <div className="d-grid justify-content-center text-center">
              <button 
                type="button" 
                className="profileRegisterButton btn btn-danger my-3 col-1.8 mx-auto" 
                onClick={handleDelete}
              >Delete</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Profile;