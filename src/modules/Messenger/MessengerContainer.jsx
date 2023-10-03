import React  from 'react';
import Messenger from "components/Messenger/Messenger";
import {
    useAuthorize,
    useGetRoom,
    useGetRooms,
    useGetUsers,
    useMessage,
    useSubscribe
} from "./api/firebase";
import {ModalManager} from "components/ModalManager";

let messenger = {};

const MessengerContainer = () => {
    messenger.user = useAuthorize();
    messenger.users = useGetUsers(messenger.user);
    messenger.rooms = useGetRooms(messenger.user, messenger.users);
    messenger.room = useGetRoom(messenger.user, messenger.rooms);
    messenger.messages = useSubscribe(messenger.room);
    messenger.message = useMessage(messenger.user, messenger.room);

    const windowName = "messenger-window:toggle";

    return (
        <ModalManager name={windowName}>
            <Messenger messenger={messenger}
                       style={{opacity:0}}
                       position={{right: 40, bottom: 100}}></Messenger>
        </ModalManager>
    );
};

export default MessengerContainer;