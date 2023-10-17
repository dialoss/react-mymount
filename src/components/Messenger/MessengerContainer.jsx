import React, {createContext, useEffect, useRef, useState} from 'react';
import Messenger from "components/Messenger/Messenger";
import {
    useGetRoom,
    useGetRooms,
    useGetUsers,

} from "./api/firebase";
import {ModalManager} from "components/ModalManager";
import {triggerEvent} from "../../helpers/events";
import ActionButton from "../../ui/Buttons/ActionButton/ActionButton";
import {login} from "./api/config";

export const MessengerContext = createContext({});

const MessengerContainer = ({user}) => {
    const token = user.firebase;
    useEffect(() => {
        if (!token) return;
        login(token);
    }, [token]);

    const windowName = "messenger-window:toggle";
    function openMessenger() {
        triggerEvent('messenger-window:toggle', {toggle: true});
    }
    const [showButton, setShow] = useState(true);

    const users = useGetUsers();
    const rooms = useGetRooms(user, users);
    const room = useGetRoom(user, rooms);

    return (
        <MessengerContext.Provider value={{user, rooms, room, users}}>
            <ModalManager name={windowName} callback={(isOpened) => setShow(!isOpened)} defaultOpened={false}>
                <Messenger style={{opacity:0}}></Messenger>
            </ModalManager>

            {showButton && <ActionButton onClick={openMessenger}
                 style={{position:"fixed",right:40, bottom:20, backgroundColor:'#c73737'}}
            >Связаться со мной</ActionButton>}
        </MessengerContext.Provider>
    );
};

export default MessengerContainer;