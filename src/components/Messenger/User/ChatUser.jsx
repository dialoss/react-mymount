import React from 'react';
import "./ChatUser.scss";
import Avatar from "ui/Avatar/Avatar";

const ChatUser = ({user}) => {
    return (
        <div className={"chat-user"}>
            <div className="user-info">
                <Avatar src={user.picture} style={{width: 20, height:20}}></Avatar>
                <h5 className="name">
                    {user.name}
                </h5>
            </div>
        </div>
    );
};

export default ChatUser;