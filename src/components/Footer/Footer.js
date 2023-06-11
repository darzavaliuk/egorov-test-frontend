import React, {useState} from 'react';
import "./Footer.css"
import SubscriptionForm from "./SubscriptionForm/SubscriptionForm";

function scrollToRef(ref) {
    ref.current.scrollIntoView({behavior: 'smooth'});
}

const Footer = (props) => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    const handleSuccess = () => {
        setPopupMessage('Subscription successful!');
        setShowPopup(true);
    };

    const handleError = () => {
        setPopupMessage('Subscription failed!');
        setShowPopup(true);
    };

    return (
        <footer className="footer">
            <div className="other-events"></div>
            <SubscriptionForm onSubmitSuccess={handleSuccess} onSubmitError={handleError}/>
            <div className="other-events" onClick={() => scrollToRef(props.accordionRef)}>
                <h2 >Other Events</h2>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19 12L12 19L5 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>

        </footer>
    );
}

export default Footer;