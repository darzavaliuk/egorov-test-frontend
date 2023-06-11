import '../normalize.css';
import './App.css';
import Footer from "../components/Footer/Footer";
import MainContent from "../components/MainContent/MainContent";
import Header from "../components/Header/Header";
import Accordion from "../components/Accordion/Accordion";
import {useRef} from "react";

function App() {
    const accordionRef = useRef(null);
    return (
        <div>
            <div className="App">
                <Header/>
                <MainContent/>
                <Footer  accordionRef={accordionRef}/>
            </div>
            <Accordion ref={accordionRef}/>
        </div>
    )
}

export default App;
