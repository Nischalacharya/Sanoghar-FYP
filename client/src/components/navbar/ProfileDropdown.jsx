import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setLogout } from '../../redux/Index';
export const ProfileDropdown = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className='profile-dropdown'>
      <ul>
        <Link className='link'><li>Profile</li></Link>
        <Link to='/hostelowner' className='link'><li>Register Hostel</li></Link>
        <Link className='link' to='/' onClick={() => dispatch(setLogout())}><li>Logout</li></Link>
      </ul>
    </div >
  )
}
