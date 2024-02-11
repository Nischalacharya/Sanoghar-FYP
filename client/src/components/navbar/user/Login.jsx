import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../../../function/User';
import './User.scss';
import { useEffect } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../../redux/Index';

export const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [response, setResponse] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const LoginHandler = async (e) => {
    e.preventDefault();
    const res = await LoginUser(user);
    if (res.user === "") return;
    dispatch(setLogin({ user: res.user }))
    navigate('/');
  };

  const googleSignInHandler = async (cred) => {
    const user = { ctoken: cred }
    const res = await LoginUser(user);
    if (res.user === "") return;
    dispatch(setLogin({ user: res.user }))
    navigate('/');
  }

  const handleShow = () => {
    setShow(!show);
  };


  return (
    <>
      <div className='login'>
        <form>
          <p>Login</p>
          <div className='inputBox'>
            <input type='text' name="email" value={user.email} required='required' onChange={handleChange} />
            <label>Email</label>
          </div>
          <div className='inputBox'>
            <input type={show ? "text" : "password"} name="password" id='password' value={user.password} required='required' onChange={handleChange} />
            <label>Password</label>
            <div id='eyeball' onClick={handleShow}>
              {show ? (<i className='fa-regular fa-eye cursor-pointer'></i>) : (<i className='fa-regular fa-eye-slash cursor-pointer'></i>)}
            </div>
          </div>
          <div className='btn-login'>
            <button type='submit' className='login-btn' onClick={(e) => LoginHandler(e)}>Login</button>
          </div>
          <GoogleLogin
            text="signin_with"
            size='medium'
            onSuccess={res => {
              googleSignInHandler(res.credential);
            }}

            auto_select={false}
          />
          <div>
            <Link to='/forgotpassword' className='link'>Forgot password</Link>
          </div>
          <div>
            <span>Don't Have An Account?<Link to="/signup" className='link'>Signup</Link></span>
          </div>
        </form >
      </div >
    </>
  )
}
