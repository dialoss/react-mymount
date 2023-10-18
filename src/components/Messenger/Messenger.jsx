import React, {useContext} from 'react';

import "./Messenger.scss";

import MessagesField from "./Message/components/MessagesField";
import MessengerHeader from "./Header/Header";
import MessengerSidebar from "./Sidebar/MessengerSidebar";
import MessengerInput from "./Input/MessengerInput";
import InputContainer from "./Input/InputContainer";
import MessagesContainer from "./Message/MessagesContainer";
import {MessengerContext} from "./MessengerContainer";

const Messenger = ({position}) => {
    const {room} = useContext(MessengerContext);
    return (
        <div className={"messenger"}>
            <MessengerSidebar></MessengerSidebar>
            <div className="wrapper">
                <div className={"messenger-block"}>
                    <MessengerHeader room={room}></MessengerHeader>
                    <MessagesContainer room={room}></MessagesContainer>
                    {!!room.id && <InputContainer room={room}></InputContainer>}
                </div>
            </div>
        </div>
    );
};

export default Messenger;