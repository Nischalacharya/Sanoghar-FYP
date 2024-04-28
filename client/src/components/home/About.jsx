import React, { useRef, useEffect, useState } from "react";
import "./Home.scss";
import one from "../../assets/about/one.jpg";
import two from "../../assets/about/two.jpg";
import three from "../../assets/about/three.jpg";
import four from "../../assets/about/four.jpg";
import five from "../../assets/about/five.jpg";
import six from "../../assets/about/six.jpg";
import video from "../../assets/about/video.mp4";
export const About = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1); // Default volume is 1 (max)
    const videoRef = useRef(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.addEventListener("ended", () => {
                setIsPlaying(false);
                videoElement.currentTime = 0;
            });
            videoElement.addEventListener("timeupdate", () => {
                setCurrentTime(videoElement.currentTime);
                setDuration(videoElement.duration);
            });
        }
    }, []);

    const togglePlayPause = () => {
        const video = videoRef.current;
        if (video) {
            if (video.paused) {
                video.play();
                setIsPlaying(true);
            } else {
                video.pause();
                setIsPlaying(false);
            }
        }
    };

    const toggleMute = () => {
        const video = videoRef.current;
        if (video) {
            video.muted = !video.muted;
            setIsMuted(video.muted);
        }
    };

    const toggleFullScreen = () => {
        const video = videoRef.current;
        if (video) {
            if (!document.fullscreenElement) {
                video.requestFullscreen().catch((err) => {
                    console.error("Fullscreen error:", err);
                });
                setIsFullScreen(true);
            } else {
                document.exitFullscreen();
                setIsFullScreen(false);
            }
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
            2,
            "0"
        )}`;
    };

    const handleSeek = (event) => {
        const video = videoRef.current;
        if (video) {
            const seekTime =
                (event.nativeEvent.offsetX / event.target.clientWidth) *
                video.duration;
            video.currentTime = seekTime;
        }
    };

    const handleVolumeChange = (event) => {
        const video = videoRef.current;
        if (video) {
            const volumeLevel = event.target.value;
            video.volume = volumeLevel;
            setVolume(volumeLevel);
            if (volumeLevel === 0) {
                setIsMuted(true);
            } else {
                setIsMuted(false);
            }
        }
    };

    return (
        <>
            <div className="about">
                <div className="about-first-section">
                    <div className="parent">
                        <div className="div1">
                            <img src={one} alt="one" />
                        </div>
                        <div className="div2">
                            <img src={two} alt="two" />
                        </div>
                        <div className="div3">
                            <img src={three} alt="three" />
                        </div>
                        <div className="div4">
                            <img src={four} alt="four" />
                        </div>
                        <div className="div5">
                            <img src={five} alt="five" />
                        </div>
                        <div className="div6">
                            <img src={six} alt="six" />
                        </div>
                    </div>
                </div>
                <div className="about-second-section">
                    <div className="video-container">
                        <video
                            ref={videoRef}
                            width="640"
                            height="360"
                            autoPlay
                            loop
                            onClick={togglePlayPause}
                        >
                            <source src={video}></source>
                        </video>
                        <div
                            className={`custom-controls ${
                                isPlaying ? "playing" : ""
                            }`}
                        >
                            <div>
                                <div
                                    className="play-pause-button"
                                    onClick={togglePlayPause}
                                >
                                    {isPlaying ? (
                                        <i className="fas fa-pause"></i>
                                    ) : (
                                        <i className="fas fa-play"></i>
                                    )}
                                </div>
                                <div className="sound-bar">
                                    <div
                                        className="volume-button"
                                        onClick={toggleMute}
                                    >
                                        {isMuted ? (
                                            <i className="fas fa-volume-mute"></i>
                                        ) : (
                                            <i className="fas fa-volume-up"></i>
                                        )}
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={volume}
                                        onChange={handleVolumeChange}
                                        className="volume-bar"
                                    />
                                </div>
                                <div className="video-bar" onClick={handleSeek}>
                                    <div
                                        className="progress-bar"
                                        style={{
                                            width: `${
                                                (currentTime / duration) * 100
                                            }%`,
                                        }}
                                    ></div>
                                </div>
                                <div className="time-display">
                                    {formatTime(currentTime)} /{" "}
                                    {formatTime(duration)}
                                </div>
                            </div>
                            <div
                                className="fullscreen-button"
                                onClick={toggleFullScreen}
                            >
                                <i
                                    className={`fas ${
                                        isFullScreen
                                            ? "fa-compress"
                                            : "fa-expand"
                                    }`}
                                ></i>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2>
                            <span>S</span>anoghar
                        </h2>
                        <p>
                            Sanoghar is not just a booking platform; it's your
                            dedicated companion in finding the perfect student
                            accommodation. Designed with the unique needs of
                            students in mind, we're here to make your housing
                            search hassle-free, affordable, and filled with
                            positive vibes. Sanoghar understands the challenges
                            students face when it comes to finding comfortable
                            and secure accommodation. We're more than a booking
                            website; we're a student-centric community committed
                            to simplifying the housing process for you.
                        </p>
                        <p>
                            From cozy dormitories to private apartments, our
                            diverse range of offerings caters to every
                            preference and budget. We prioritize comfort,
                            security, and convenience, ensuring that you find a
                            sanctuary where you can thrive academically and
                            socially. Join us at Sanoghar, where the pursuit of
                            your dream accommodation is met with unparalleled
                            support, guidance, and a sense of belonging.
                            Together, let's simplify the housing process and
                            embark on a journey filled with endless
                            possibilities.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
