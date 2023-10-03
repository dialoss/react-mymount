import React, {useState} from 'react';
import Avatar from "ui/Avatar/Avatar";
import "./MessengerSidebar.scss";
import {triggerEvent} from "helpers/events";

const MessengerSidebar = ({rooms, currentRoom}) => {
    function setRoom(id) {
        triggerEvent("messenger:set-room", id);
    }
    return (
        <div className={"messenger-sidebar"}>
            <div className={"sidebar-container"}>
                {
                    Object.values(rooms).map((room, index) =>
                        <div className={"sidebar-item " + (room.id === currentRoom.id ? "current" : '')}
                             onClick={() => setRoom(room.id)} key={index}>
                            <Avatar src={room.picture}
                                    style={{width:50, height:50, }}
                                    key={index}></Avatar>
                            <h3 className={"title"}>{room.title}</h3>
                        </div>)
                }
            </div>
        </div>
    );
};

export default MessengerSidebar;