import React, {useState} from 'react';
import Popup from "../Popup/Popup";
import {Roller} from "react-spinners-css";
// import PopupMenu from "./Popup";
import './SubscriptionForm.css';

const SubscriptionForm = () => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
        setShowErrorPopup(false);
        setShowSuccessPopup(false);
    }
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateEmail(email)) {
            setIsLoading(true);
            fetch('/api/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: email})
            })
                .then(res => {
                    setIsLoading(false);
                    if (res.ok && !isLoading) {
                        setShowSuccessPopup(true);
                    } else if (!isLoading) {
                        setShowErrorPopup(true);
                    }
                })
                .catch(err => {setShowErrorPopup(true); setIsLoading(false)});
        } else {
            setIsValid(false);
        }
    }

    return (
        <div>
            {isLoading && <Roller color="#DF2224" size={50}  className="roller-style" />}
            <form className="subscription-form" onSubmit={handleSubmit}>
                <div className="flex-box">
                    <input type="text" placeholder="Enter your Email and get notified" value={email}
                           onChange={e => {
                               setEmail(e.target.value);
                               setIsValid(validateEmail(e.target.value));

                           }}/>
                    <button type="submit" disabled={!isValid} onClick={togglePopup}
                            style={{opacity: !isValid ? 0.5 : 1}}>
                        <div></div>
                    </button>

                    {showSuccessPopup && isOpen && <Popup
                        content={<>
                            <h1>Success</h1>
                            <p>You have successfully subscribed to the email newsletter</p>
                            <button onClick={togglePopup}>Close</button>
                        </>}
                        handleClose={togglePopup}
                    />

                    }
                    {showErrorPopup && isOpen && <Popup
                        content={<>
                            <h1>Error</h1>
                            <p>You have error subscribed to the email newsletter</p>
                            <button onClick={togglePopup}>Close</button>
                        </>}
                        handleClose={togglePopup}
                    />

                    }
                </div>
            </form>
        </div>

    );
}

export default SubscriptionForm;