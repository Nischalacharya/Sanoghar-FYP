import React from "react";
import "./home.scss";
import img2 from "../../assets/about/two.jpg";
import { motion } from "framer-motion";

export const Introduction = () => {
    return (
        <>
            <motion.div className="introduction-hostel overflow-hidden">
                <motion.div
                    className="left-container"
                    initial={{ x: -400 }}
                    whileInView={{ x: 0 }}
                    transition={{
                        duration: 0.3,
                        type: "tween",
                    }}
                >
                    <h1>Introduction</h1>
                    <h2>परिचय</h2>
                    <p>
                        Sanoghar, a leading hostel organization in Nepal, offers
                        a seamless platform for hostel owners to register their
                        accommodations and students to conveniently book hostel
                        rooms. With its widespread network covering various
                        regions of Nepal, Sanoghar provides a plethora of hostel
                        options, ensuring accessibility and convenience for
                        students across the country. By facilitating this
                        process, Sanoghar aims to simplify the search for
                        suitable accommodations, making the transition for
                        students smoother and ensuring the availability of
                        quality hostel facilities nationwide.
                    </p>
                    <span>
                        Unlock Comfort, Discover Convenience: Sanoghar - Your
                        Passport to Hostel Ease Across Nepal.
                    </span>
                </motion.div>
                <motion.div
                    className="right-container"
                    initial={{ x: 400 }}
                    whileInView={{ x: 0 }}
                    transition={{
                        duration: 0.3,
                        type: "tween",
                    }}
                >
                    <img src={img2} />
                </motion.div>
            </motion.div>
        </>
    );
};
