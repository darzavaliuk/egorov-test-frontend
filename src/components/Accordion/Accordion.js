import React, {forwardRef, useEffect, useRef, useState} from "react";
import "./Accordion.css";
import party from "../../assets/party.jpg"

const Accordion = forwardRef((props, ref) => {
    const [selected, setSelected] = useState(0);
    const [isAnimated, setIsAnimated] = useState(false);
    const titleRef = useRef(null);

    const handleSelect = (index) => {
        setSelected(index);
    };

    const handleIntersection = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setIsAnimated(true);
            }
        });
    };

    const titles = [
        "Hawaiian party",
        "Мafia party",
        "Party",
        "Party on the beach",
        "Home Security",
        "Network Design & Implementation",
        "System Design & Engineering",
        "Client Care Plans"
    ];

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5
        };

        const observer = new IntersectionObserver(handleIntersection, options);
        observer.observe(titleRef.current);

        return () => {
            observer.unobserve(titleRef.current);
        };
    }, []);

    return (
        <div ref={ref} className="accoridion-panel">
            <h1 ref={titleRef} className={isAnimated ? "title-events animate visible" : "title-events animate"}>
                All events
            </h1>
            <div className="accordion">
                {[...Array(8)].map((_, index) => (
                    <React.Fragment key={index}>
                        <input
                            type="radio"
                            name="select"
                            className="accordion-select"
                            checked={selected === index}
                            onChange={() => handleSelect(index)}
                        />
                        <div className="accordion-title" onClick={() => handleSelect(index)}>
                            <span>{titles[index]}</span>
                            <p>0{index + 1}</p>
                        </div>

                        <div className="accordion-content">

                            <div className="panel">
                                <div>
                                    <img src={party} alt={"party"}>

                                    </img>
                                    <div className="panel-title">
                                        <p>0{index + 1}</p>
                                        <h2>{titles[index]}</h2>
                                        <h3>13.02.2023</h3>
                                        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                                            <button type="submit">More information</button>
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
});

export default Accordion;