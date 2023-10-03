import React, {useEffect, useRef} from 'react';
import MessageBlock from "./MessageBlock";
import "./MessagesField.scss";

const MessagesField = ({messages, users}) => {
    const ref = useRef();
    useEffect(() => {
        ref.current.scrollTop = 9999;
    }, [messages]);
    return (
        <div className={"messages-field"} ref={ref}>
            {
                messages.map(message => {
                    let user = users[message.user];
                    if (!user) return;
                    let side = 'left';
                    if (user.current) {
                        side = 'right'
                    }
                    return <MessageBlock message={message} user={user} side={side} key={message.id}></MessageBlock>
                })
            }
        </div>
    );
};

export default MessagesField;