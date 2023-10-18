import React, {useContext} from 'react';
import "./Header.scss"
import Avatar from "ui/Avatar/Avatar";
import WindowButton from "ui/Buttons/WindowButton/WindowButton";
import {MessengerContext} from "../MessengerContainer";

const MessengerHeader = ({room}) => {
    return (
        <div className={"messenger-header"}>
            {!!room.picture && <Avatar src={room.picture} style={{width:50, height:50}}></Avatar>}
            <p className={"title"}>{room.title}</p>
            <WindowButton type={'close'}></WindowButton>
        </div>
    );
};

export default MessengerHeader;