import React from 'react'

export const Footer = () => {
  return (
    <>
    <div className='footer'>
        <div className='footer-shortcut'>
            <p className='footer-title'>Sanoghar</p>
            <p>About Us</p>
            <p>Boys Hostel</p>
            <p>Girls Hostel</p>
        </div>
        <div className='footer-shortcut'>
            <p className='footer-title'>Customers</p>
            <p>Security</p>
            <p>Privacy and policy</p>
            <p>Terms and Conditions</p>
        </div>
        <div className='footer-shortcut'>
            <p className='footer-title'>Follow us on</p>
            <div className='social-icon'>
              <i class="fa-brands fa-instagram"></i>
              <i class="fa-brands fa-facebook"></i>
              <i class="fa-brands fa-linkedin"></i>
              <i class="fa-brands fa-twitter"></i>
            </div>
        </div>
        <div className='footer-shortcut footer-mail'>
            <p className='footer-title'>Signup for special Offers</p>
            <div className='mail-section'>
                <div>
                  <input type='email' placeholder='email'/>
                </div>
                <div>
                    <button>Subscribe</button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
