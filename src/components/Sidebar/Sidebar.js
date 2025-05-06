import React from "react";
import './Sidebar.css'; // Import CSS for styling
import { assets} from '../../assets/assets'; // Import assets from the assets folder

const Sidebar = () => {

    const [extended, setExtended] = React.useState(false); // State to manage sidebar extension

    return (
        <div className="sidebar">
            <div className="sidebar-top">
                <img onClick={()=>setExtended(prev=>!prev)} className="menu" src={assets.menu_icon} alt=""/>
                <div className="new-chat">
                    <img src={assets.plus_icon} alt=""/>
                    {extended?<p>New Chat</p>:null}
                </div>
                {extended?
                <div className="recent">
                    <p className="recent-title">Recent</p>
                    <div className="recent-entry">
                        <img src={assets.message_icon} alt=""/>
                        <p>What is Hung Yen University of Technology and Education ...</p>
                    </div>
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
