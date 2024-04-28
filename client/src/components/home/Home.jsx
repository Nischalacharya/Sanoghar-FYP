import React from 'react'
import { Carousel } from './Carousel'
import { FeaturedHostel } from './FeaturedHostel';
import { Footer } from './Footer';
import './Home.scss';
import { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { LoginUser } from '../../function/User';
import { setLogin } from '../../redux/Index';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Introduction } from './Introduction';

export const Home = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storage = useSelector(state => state)
  const googleSignInHandler = async (cred) => {
    const user = { ctoken: cred }
    const res = await LoginUser(user);
    if (res.message === "User does not exist") return toast.error(res.message);
    toast.success('Login Successful');
    dispatch(setLogin({ user: res.user }))
    res.isAdmin === "true" ? navigate('/admin') : navigate('/');
  }

  return (
    <>
      {
        useGoogleOneTapLogin({
          onSuccess: credentialResponse => {
            googleSignInHandler(credentialResponse.credential)
          },
          onError: () => {
            toast.error('Login Failed');
          },

          disabled: storage.user
        })
      }
      <Carousel />
      <Introduction />
      <FeaturedHostel />
      <Footer />
    </>

  )
}
