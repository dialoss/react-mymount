import React, {useContext, useEffect, useRef} from 'react';
import MessageBlock from "./MessageBlock";
import "./MessagesField.scss";
import {MessengerContext} from "../../MessengerContainer";

const MessagesField = ({messages}) => {
    const {user} = useContext(MessengerContext);

    const ref = useRef();
    useEffect(() => {
        ref.current.scroll(0, ref.current.scrollHeight);
    }, [messages]);

    return (
        <div className="messages-wrapper">
            <div className={"background"}>
                <div className="pattern"></div>
            </div>
            <div className="messages-inner">
                <div className={"messages-field"} ref={ref}>
                    {
                        messages.map(message => {
                            let side = 'left';
                            if (message.user === user.id) {
                                side = 'right'
                            }
                            return <MessageBlock message={message} side={side} key={message.id}></MessageBlock>
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default MessagesField;