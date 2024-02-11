import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './User.scss';
import { forgotPassword, LoginUser } from '../../../function/User';

export const ForgotPassword = () => {

  const [email, setEmail] = useState("")

  const navigate = useNavigate();

  const ForgotPasswordHandler = async (e) => {
    e.preventDefault();
    const res = await forgotPassword({ email });
    if (!res) return;
  }

  return (
    <>
      <div className='forgot-password'>
        <form>
          <div>
            <p>Forgot password?</p>
          </div>
          <div className='inputBox'>
            <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='reset-btn'>
            <button onClick={(e) => ForgotPasswordHandler(e)} >Reset Password</button>
          </div>
          <div><Link to='/login' className='link'>Back to Login</Link></div>
        </form>
      </div>
    </>
  )
}
