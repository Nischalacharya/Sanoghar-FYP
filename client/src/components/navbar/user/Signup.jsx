import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignupUser } from '../../../function/User';
import './User.scss';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../../redux/Index';

export const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    mobilenumber: "",
    gender: "none"
  })
  const [response, setResponse] = useState(null)

  const handleChange = e => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const SignupHandler = async (e) => {
    e.preventDefault();
    const res = await SignupUser(user);
    setResponse(res.message);
    if (res.message === "User Registered sucessfully") {
      dispatch(setLogin({ user: res.user }))
      navigate('/')
    } else {
      console.log(res.message);
    }
  }

  const googleSignUpHandler = async (credential) => {
    const user = { ctoken: credential }
    const res = await SignupUser(user);
    if (res.message === "User Registered sucessfully") {
      dispatch(setLogin({ user: res.user }))
      navigate('/')
    } else {
      console.log(res.message);
    }
  }

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show)
  }
  return (
    <>
      <div className='signup'>
        <form>
          <p>Create New Account</p>
          <div className='signup-box'>
            <div>
              <div className='inputBox'>
                <input type='email' name="email" value={user.email} required='required' onChange={handleChange} />
                <label>Email</label>
              </div>
              <div className='inputBox'>
                <input type='text' name="username" value={user.username} required='required' onChange={handleChange} />
                <label>Username</label>
              </div>
            </div>
            <div>
              <div className='inputBox'>
                <input type='text' name="mobilenumber" value={user.mobilenumber} required='required' onChange={handleChange} />
                <label>Mobile number</label>
              </div>
              <div className='inputBox'>
                <input type={show ? "text" : "password"} name="password" id='password' value={user.password} required='required' onChange={handleChange} />
                <label>Password</label>
                <div id='eyeball' onClick={handleShow}>
                  {show ? (<i className='fa-regular fa-eye cursor-pointer'></i>) : (<i className='fa-regular fa-eye-slash cursor-pointer'></i>)}
                </div>
              </div>
              <select name='gender' value={user.gender} onChange={handleChange}>
                <option value='none' selected>Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
            </div>
          </div>
          <div className='signup-btn'>
            <button onClick={(e) => SignupHandler(e)}>Create</button>
          </div>
          <GoogleLogin
            onSuccess={res => {
              googleSignUpHandler(res.credential);
            }}
            size='medium'
            text="signup_with"
          />
        </form>
      </div>
    </>
  )
}
