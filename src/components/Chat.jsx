import React, { useContext } from "react";
import Cam from "../img/video.png"
import User from "../img/add-user.png"
import More from "../img/more.png"
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
const Chat = () => {

    const {data}=useContext(ChatContext)
    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <div className="chatIcons">
                    <img src={Cam} alt=""></img>
                    <img src={User} alt=""></img>
                    <img src={More} alt=""></img>
                </div>
                
            </div>
            <Messages />
            <Input />
        </div>
    )
}

export default Chat