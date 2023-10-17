import React, {useContext} from 'react';
import "./Header.scss"
import Avatar from "ui/Avatar/Avatar";
import WindowButton from "ui/Buttons/WindowButton/WindowButton";
import {MessengerContext} from "../MessengerContainer";

const MessengerHeader = ({room}) => {
    return (
        <div className={"messenger-header"}>
            <Avatar src={room.picture} style={{width:50, height:50}}></Avatar>
            <h3 className={"title"}>{room.title}</h3>
            <WindowButton type={'close'}></WindowButton>
        </div>
    );
};

export default MessengerHeader;