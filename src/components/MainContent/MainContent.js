import React from 'react';
import Countdown from "./CountDown/CountDown";
import "./MainContent.css";
import EventSection from "./EventSection/EventSection";
const MainContent = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    return (
        <main className="main">
            <h1 className="title">
                Under Construction
            </h1>
            <h3 className="subtitle">We're making lots of improvements and will be back soon</h3>
            <Countdown date={`${year}-07-24T00:00:00`}/>
            <EventSection />
        </main>
    )
};

export default MainContent;