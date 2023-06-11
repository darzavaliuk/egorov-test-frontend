import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import "./CountDown.css";

const Countdown = ({date}) => {
    const [countDown, setCountDown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const onResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const addLeadingZeros = (value) => {
        value = String(value);
        while (value.length < 2) {
            value = "0" + value;
        }
        return value;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const newCountDown = calculateCountdown(date);
            newCountDown ? setCountDown(newCountDown) : clearInterval(interval);
        }, 1000);

        return () => clearInterval(interval);
    }, [date]);

    const calculateCountdown = (endDate) => {
        let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

        if (diff <= 0) return false;

        const timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

        if (diff >= 86400) {
            timeLeft.days = Math.floor(diff / 86400);
            diff -= timeLeft.days * 86400;
        }
        if (diff >= 3600) {
            timeLeft.hours = Math.floor(diff / 3600);
            diff -= timeLeft.hours * 3600;
        }
        if (diff >= 60) {
            timeLeft.minutes = Math.floor(diff / 60);
            diff -= timeLeft.minutes * 60;
        }

        timeLeft.seconds = diff;

        return timeLeft;
    }

    const days = ["Days", "Hours", "Minutes", "Seconds"];

    return (
        <div className="countdown">
            {days.map((day, index) => (
                <span className="countdown-col">
                <span className="countdown-col-element">
                    <strong>{addLeadingZeros(countDown[day.toLowerCase()])} </strong>

                    {width < 788 ?
                        <svg width="64" height="40" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0 40C3.2378 31.528 6.98908 30.7826 14.1065 30.7826C21.224 30.7826 29.5823 30.5093 41.15 30.7826C53.602 31.0807 63.2155 21.2919 64 -2.79753e-06C60.7622 8.47205 56.5545 10.0124 49.437 10.0124C42.3196 10.0124 38.0406 10.2857 26.4729 10.0124C14.0209 9.7143 4.30755 19.2547 0 40Z"
                                fill="#DF2224"/>
                            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
                                  fill="white" fontSize="12"
                                  fontFamily="Poppins"
                                  fontWeight="bold">
                                {day.charAt(0) + day.charAt(0)}
                            </text>
                        </svg> :
                        <svg height="54" viewBox="0 0 132 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0 54C6.67796 42.5627 14.415 41.5565 29.0947 41.5565C43.7745 41.5565 61.0136 41.1876 84.8718 41.5565C110.554 41.959 130.382 28.7441 132 -1.95521e-06C125.322 11.4373 116.644 13.5168 101.964 13.5168C87.2841 13.5168 78.4587 13.8857 54.6004 13.5168C28.9182 13.1143 8.88433 25.9938 0 54Z"
                                fill="#DF2224"/>
                            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
                                  fill="white" fontSize="16"
                                  fontFamily="Poppins"
                                  fontWeight="bold">
                                {day}
                            </text>
                        </svg>
                    }

                </span>
                    {(index === days.length - 1) ? <></> : <strong>:</strong>}
            </span>))}

        </div>
    );
};

Countdown.propTypes = {
    date: PropTypes.string.isRequired
};

Countdown.defaultProps = {
    date: new Date()
};

export default Countdown;