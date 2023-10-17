import React from 'react';
import Message from "./Message";
import ChatUser from "../../User/ChatUser";
import "./MessageBlock.scss";

const MessageBlock = ({message, side}) => {
    return (
        <div className={"message-block message-block--" + side}>
            <div className={"message-inner"}>
                <Message data={message}></Message>
            </div>
        </div>
    );
};

export default MessageBlock;