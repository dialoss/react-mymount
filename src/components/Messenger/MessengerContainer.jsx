import React, {createContext, useLayoutEffect} from 'react';
import Messenger from "components/Messenger/Messenger";
import {
    useGetRoom,
    useGetRooms,
    useGetUsers,

} from "./api/firebase";
import {ModalManager} from "components/ModalManager";
import {login, setAppName} from "./api/config";

export const MessengerContext = createContext({});

const MessengerContainer = ({appName, user}) => {
    setAppName(appName);
    useLayoutEffect(() => {
        let token = user.firebase;
        if (!token) return;
        login(token);
    }, []);

    const windowName = "messenger-window:toggle";

    const users = useGetUsers();
    const [rooms, setRooms] = useGetRooms(user, users);
    const room = useGetRoom(user, rooms, setRooms);

    return (
        <MessengerContext.Provider value={{user, rooms, room, users}}>
            {!!Object.values(users).length &&
            <ModalManager name={windowName} defaultOpened={true} closeConditions={['btn']}>
                <Messenger style={{bg:'without-bg', win: 'centered'}}></Messenger>
            </ModalManager>}
        </MessengerContext.Provider>
    );
};

export default MessengerContainer;