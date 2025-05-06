import React from "react";
import './Main.css'; // Import CSS for styling
import { assets} from '../../assets/assets'; // Import assets from the assets folder

const Main = () => {
    return (
        <div className="main">
            <div className="nav">
                <p>Support Chatbot</p>
                <img src={assets.user_icon} alt=""/>
            </div>
            <div className="main-container">
                <div className="greet">
                    <p><span>Hello !</span></p>
                    <p>How can I help you today?</p>
                </div>
                <div className="cards">
                    <div className="card">
                        <p>Where is Hung Yen University of Technology and Education ?</p>
                        <img src={assets.compass_icon} alt=""/>
                    </div>
                    <div className="card">
                        <p>About Hung Yen University of Technology and Education</p>
                        <img src={assets.bulb_icon} alt=""/>
                    </div>
                    <div className="card">
                        <p>Ask about administrative procedures or paperworks</p>
                        <img src={assets.message_icon} alt=""/>
                    </div>
                    <div className="card">
                        <p>Ask about applying for school admission</p>
                        <img src={assets.code_icon} alt=""/>
                    </div>
                </div>

                <div className="main-bottom">
                    <div className="search-box">
                        <input type="text" placeholder="Type your question here..."/>
                        <div>
                            <img src={assets.gallery_icon} alt=""/>
                            <img src={assets.mic_icon} alt=""/>
                            <img src={assets.send_icon} alt=""/>
                        </div>
                    </div>
                    <p className="bottom-info">
                        Chatbot is in building phase so it's may display inaccurate informations. Please verify before taking any action.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main;