import React, {useContext, useEffect, useRef} from 'react';
import MessageBlock from "./MessageBlock";
import "./MessagesField.scss";
import {MessengerContext} from "../../MessengerContainer";

const MessagesField = ({messages, empty}) => {
    const {user} = useContext(MessengerContext);

    const ref = useRef();
    useEffect(() => {
        if (ref.current) ref.current.scrollIntoView({behavior: 'smooth', block:'nearest', inline:'start'});
    }, [messages]);

    return (
        <div className="messages-wrapper">
            <div className={"background"}>
                <div className="pattern"></div>
            </div>
            {!empty ?
                <div className="messages-inner">
                <div className={"messages-field"}>
                    {
                        messages.map(message => {
                            let side = 'left';
                            if (message.user === user.id) {
                                side = 'right'
                            }
                            return <MessageBlock message={message} side={side} key={message.id}></MessageBlock>
                        })
                    }
                    <div className={'anchor'} style={{height:1}} ref={ref}></div>
                </div>
                </div> :
                <div className={"chat-empty"}>
                    выберите чат
                </div>}
        </div>
    );
};

export default MessagesField;