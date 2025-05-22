import React, {useContext} from "react";
import './Main.css'; // Import CSS for styling
import { assets} from '../../assets/assets'; // Import assets from the assets folder
import { Context } from "../../context/context";

const Main = () => {

    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context);

    return (
        <div className="main">
            <div className="nav">
                <p>Support Chatbot</p>
                <img src={assets.user_icon} alt=""/>
            </div>
            <div className="main-container">

                {!showResult
                ?<>
                <div className="greet">
                    <p><span>Hello !</span></p>
                    <p>How can I help you today?</p>
                </div>
                <div className="cards">
                    <div onClick={()=>onSent("Where is University of Technology and Education Hung Yen?")} className="card">
                        <p>Where is University of Technology and Education Hung Yen?</p>
                        <img src={assets.compass_icon} alt=""/>
                    </div>
                    <div onClick={()=>onSent("Tell me about University of Technology and Education Hung Yen")} className="card">
                        <p>Tell me about University of Technology and Education Hung Yen </p>
                        <img src={assets.bulb_icon} alt=""/>
                    </div>
                    <div onClick={()=>onSent("Tell me about administrative procedures or paperworks")} className="card">
                        <p>Tell me about administrative procedures or paperworks</p>
                        <img src={assets.message_icon} alt=""/>
                    </div>
                    <div onClick={()=>onSent("Tell me about applying for school admission")} className="card">
                        <p>Tell me about applying for school admission</p>
                        <img src={assets.code_icon} alt=""/>
                    </div>
                </div>
                </>
                :<div className="result">
                    <div className="result-title">
                        <img src={assets.user_icon} alt=""/>
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.google_gemini_icon} alt=""/>
                        {loading
                        ?<div className="loader">
                            <hr />
                            <hr />  
                            <hr />
                        </div>
                        :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                        }                        
                    </div>
                </div>
                }

                

                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e)=>setInput(e.target.value)} value = {input} type="text" placeholder="Type your question here..."/>
                        <div>
                            <img src={assets.gallery_icon} alt=""/>
                            <img src={assets.mic_icon} alt=""/>
                            {input?<img onClick={()=>onSent()} src={assets.send_icon} alt=""/>:null}
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