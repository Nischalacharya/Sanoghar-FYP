import React from "react";

export const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="footer-description">
                    <h2>Sanoghar</h2>
                    <p>
                        Sanoghar: Your student housing partner. Hassle-free,
                        affordable, and student-centric. We simplify your search
                        for secure and comfortable accommodation.
                    </p>
                </div>
                <div className="footer-links">
                    <div className="footer-links-top">
                        <div>
                            <p className="first-section">
                                <i class="fa-solid fa-location-dot"></i>Address
                            </p>
                            <p>Bhaktapur</p>
                        </div>
                        <div>
                            <p className="first-section">
                                <i class="fa-solid fa-phone"></i>Phone
                            </p>
                            <p>9999999999</p>
                        </div>
                        <div>
                            <p className="first-section">
                                <i class="fa-solid fa-envelope"></i>Email
                            </p>
                            <p>sanoghar@gmail.com</p>
                        </div>
                    </div>
                    <div className="footer-links-bottom">
                        <div>
                            <p className="first-section">Our Services</p>
                            <p>Hostel Booking</p>
                            <p>About Us</p>
                        </div>
                        <div className="contact-section">
                            <p>Contact Us</p>
                            <div>
                                <div>
                                    <i class="fa-brands fa-facebook"></i>
                                </div>
                                <div>
                                    <i class="fa-brands fa-instagram"></i>
                                </div>
                                <div>
                                    <i class="fa-brands fa-twitter"></i>
                                </div>
                                <div>
                                    <i class="fa-brands fa-youtube"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
