import React, {useContext, useState} from "react";
import './Sidebar.css'; // Import CSS for styling
import { assets} from '../../assets/assets'; // Import assets from the assets folder
import { Context } from "../../context/context"; // Importing context for state management

const Sidebar = () => {

    const [extended, setExtended] = useState(false); // State to manage sidebar extension
    const {onSent, prevPrompt, setRecentPrompt, newChat} = useContext(Context); // Importing onSent function from context

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt); // Call the getRecentPrompt function with the prompt
        await onSent(prompt); // Call the onSent function with the prompt
    }

    return (
        <div className="sidebar">
            <div className="sidebar-top">
                <img onClick={()=>setExtended(prev=>!prev)} className="menu" src={assets.menu_icon} alt=""/>
                <div onClick={()=>newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt=""/>
                    {extended?<p>New Chat</p>:null}
                </div>
                {extended?
                <div className="recent">
                    <p className="recent-title">Recent</p>
                    {prevPrompt.map((item, index) => {
                        return (
                            <div onClick={()=>loadPrompt(item)} className="recent-entry">
                                <img src={assets.message_icon} alt=""/>
                                <p>{item.slice(0,18)}...</p>
                            </div>
                        )
                    })}
                    
                </div>
                :null
                }
            </div>
            <div className="sidebar-bottom">
                <div className="sidebar-bottom-item recent-entry">
                    <img src={assets.question_icon} alt=""/>
                    {extended?<p>Help</p>:null}
                </div>
                <div className="sidebar-bottom-item recent-entry">
                    <img src={assets.history_icon} alt=""/>
                    {extended?<p>Activity</p>:null}
                </div>
                <div className="sidebar-bottom-item recent-entry">
                    <img src={assets.setting_icon} alt=""/>
                    {extended?<p>Setting</p>:null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
