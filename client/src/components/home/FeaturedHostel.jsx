import React from 'react'
import imagehostel from '../../assets/carousel/one.jpg';
import imagehostel2 from '../../assets/carousel/two.jpg';
import imagehostel3 from '../../assets/carousel/three.jpg';
import imagehostel4 from '../../assets/carousel/four.jpg';
export const FeaturedHostel = () => {
  return (
    <>
    <div className='featured-hostel-item'>
        <h1>Featured Hostel</h1>
        <div className='featured-hostel'>
        <div className='hostel'>
            <img src={imagehostel} className='featured-img'/>
            <div className='featured-text'>
                <p className='hostel-name'>United Boys Hostel</p>
                <p className='hostel-price'>Rs.11,000</p>
                <p className='hostel-address'>Bhaktapur,Suryavinayak</p>
                <p className='hostel-rating'><i class="fa-regular fa-star"></i>4.5</p>
            </div>
        </div>
        <div className='hostel'>
            <img src={imagehostel2} className='featured-img'/>
            <div className='featured-text'>
                <p className='hostel-name'>Gems boys hostel</p>
                <p className='hostel-price'>Rs.9,000</p>
                <p className='hostel-address'>Bhaktapur,Kamalvinayak</p>
                <p className='hostel-rating'><i class="fa-regular fa-star"></i>5</p>
            </div>
        </div>
        <div className='hostel'>
            <img src={imagehostel3} className='featured-img'/>
            <div className='featured-text'>
                <p className='hostel-name'>Greatwall boys hostel</p>
                <p className='hostel-price'>Rs.10,000</p>
                <p className='hostel-address'>Kathmandu, Baneshwor</p>
                <p className='hostel-rating'><i class="fa-regular fa-star"></i>4</p>
            </div>
        </div>
        <div className='hostel'>
            <img src={imagehostel4} className='featured-img'/>
            <div className='featured-text'>
                <p className='hostel-name'>Gaughar Hostel</p>
                <p className='hostel-price'>Rs.7,000</p>
                <p className='hostel-address'>Kausaltar, Bkt</p>
                <p className='hostel-rating'><i class="fa-regular fa-star"></i>3.5</p>
            </div>
        </div>
        </div>
    </div>
    </>
  )
}
