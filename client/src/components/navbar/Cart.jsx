import React from 'react'
import './Navbar.scss';
import img1 from '../../assets/carousel/one.jpg';
export const Cart = () => {
  return (
    <>
    <div className='cart'>
        <div className='cart-item'>
            <div>
                <div>
                    <img src={img1}/>
                </div>
                <div>
                   <h1>Twitter Boys Hostel</h1>
                   <p>Suryavinayak, Bhaktapur</p>
                   <p className='sex'>Male</p>
                </div>
            </div>
            <div className='last-div'>
              <p>Rs.11111</p>
              <button>Remove</button>
            </div>
        </div>
    </div>
    </>
      
  )
}
