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
export const Home = () => {

  const navigate = useNavigate();
  const storage = useSelector(state => state)
  const googleSignInHandler = (credential) => {

  }

  return (
    <>
      {
        useGoogleOneTapLogin({
          onSuccess: credentialResponse => {
            console.log(credentialResponse);
          },
          onError: () => {
            console.log('Login Failed');
          },

          disabled: storage.user
        })
      }
      <Carousel />
      <FeaturedHostel />
      <Footer />
    </>

  )
}
