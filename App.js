import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 24);
  targetDate.setHours(targetDate.getHours() + 13);
  targetDate.setMinutes(targetDate.getMinutes() + 35);
  targetDate.setSeconds(targetDate.getSeconds() + 50);

  const calculateTimeRemaining = () => {
    const now = new Date();
    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const colors = ["yellow", "grey", "pink"];
  const [buttonPosition, setButtonPosition] = useState({ x: 700, y: 300 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setCurrentColorIndex((prevIndex) =>
        prevIndex < colors.length - 1 ? prevIndex + 1 : 0
      );
    }, 4000); // Change color every 5 seconds

    return () => clearInterval(colorInterval);
  }, []);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageList = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/640px-Google_Chrome_icon_%28February_2022%29.svg.png",
    "https://gartcod.cloud/_next/static/media/desktop.6a735a94.svg",
    "https://cdn-icons-png.flaticon.com/256/0/191.png",
  ];

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < imageList.length - 1 ? prevIndex + 1 : 0
      );
    }, 4000);

    return () => clearInterval(imageInterval);
  }, []);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setButtonPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="App">
      <center
        style={{
          transition: "background-color 0.3s ease-in-out",
          backgroundColor: `rgba(${
            currentColorIndex === 0
              ? "255, 255, 0"
              : currentColorIndex === 1
              ? "255, 192, 203"
              : "169, 169, 169"
          }, 0.080)`,
          height: "100vh",
        }}
      >
        <div className="contentdiv">
          <img
            src="https://gartcod.cloud/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgartcod-without-bg.33aa91c5.png&w=128&q=75"
            className="headerfirstimg"
            width={"90px"}
            alt=""
          />
          <span className="header">
            for{" "}
            <span>
              <img
                src={imageList[currentImageIndex]}
                alt="Current"
                style={{
                  filter: `hue-rotate(${currentColorIndex * 120}deg)`,
                }}
                className="imgs"
              />
            </span>
            {"  "}
            <span style={{ color: colors[currentColorIndex] }}>
              & cloud <br />
              <center>gaming</center>
            </span>
          </span>
          <span>
            <span>Join us on the launch of gartcod by </span>
            <img
              src="https://gartcod.cloud/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprovoke_logo.d9109ac6.png&w=64&q=75"
              className="img2"
              alt="img"
            />
          </span>
          <br />
          <br />
          <br />
          <span>
            <div className="countdowntimer">
              <div>
                <p>{timeRemaining.days}</p>
                <small style={{ color: colors[currentColorIndex] }}>days</small>
              </div>
              <div>
                <p>{timeRemaining.hours}</p>
                <small style={{ color: colors[currentColorIndex] }}>
                  hours
                </small>
              </div>
              <div>
                <p>{timeRemaining.minutes}</p>
                <small style={{ color: colors[currentColorIndex] }}>
                  minutes
                </small>
              </div>
              <div>
                <p>{timeRemaining.seconds}</p>
                <small style={{ color: colors[currentColorIndex] }}>
                  seconds
                </small>
              </div>
            </div>
          </span>
          <button
            style={{
              backgroundColor: colors[currentColorIndex],
              position: "absolute",
              top: isDragging ? buttonPosition.y : buttonPosition.y,
              left: isDragging ? buttonPosition.x : buttonPosition.x,
            }}
            onMouseDown={handleMouseDown}
          >
            Claim Ticket
          </button>
        </div>
      </center>
    </div>
  );
};

export default App;
