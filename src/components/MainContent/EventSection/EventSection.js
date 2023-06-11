import React from 'react';
import "./EventSection.css"

const EventSection = () => {
    function handleClick() {
        window.location.href = 'https://www.example.com';
    }

    return (
        <div className="event-section-wrapper">
            <h3>Check our event page when you wait:</h3>
            <div className="event-section-button" onClick={handleClick}>
                <h2>Go to the event</h2>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.16666 10H15.8333" stroke="white" stroke-width="2" stroke-linecap="round"
                          stroke-linejoin="round"/>
                    <path d="M10 4.16667L15.8333 10L10 15.8333" stroke="white" stroke-width="2" stroke-linecap="round"
                          stroke-linejoin="round"/>
                </svg>
            </div>
        </div>)
};

export default EventSection;