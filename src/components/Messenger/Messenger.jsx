import React from 'react';

import "./Messenger.scss";

import TextEditor from "ui/TextEditor/TextEditor";
import MessagesField from "./Message/MessagesField";
import MessengerHeader from "./Header/Header";
import MessengerSidebar from "./Sidebar/MessengerSidebar";

const Messenger = ({messenger, position}) => {
    return (
        <div className={"messenger"}>
            <div className={"messenger-block"}>
                <MessengerSidebar currentRoom={messenger.room.current} rooms={messenger.rooms.current}></MessengerSidebar>
            </div>
            <div className={"messenger-block"}>
                <MessengerHeader room={messenger.room.current}></MessengerHeader>
                <MessagesField messages={messenger.messages} users={messenger.users.current}></MessagesField>
                <TextEditor value={messenger.message.value} callback={messenger.message.callback} simple={true}></TextEditor>
            </div>
        </div>
    );
};

export default Messenger;