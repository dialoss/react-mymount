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

let messenger = {
    room: {},
    rooms: {},
    user: {},
    users: {},
    messages: [],
    message: {
        value: '',
        callback: () => {},
    },
};

const MessengerContainer = () => {
    messenger.user = useAuthorize();
    messenger.users = useGetUsers(messenger.user);

    messenger.rooms = useGetRooms(messenger.user, messenger.users);
    messenger.room = useGetRoom(messenger.user, messenger.rooms);

    messenger.messages = useSubscribe(messenger.room);
    const [message, setMessage] = useMessage(messenger.user, messenger.room);
    messenger.message = {
        value: message,
        callback: setMessage,
    }

    return (
        <Messenger messenger={messenger}></Messenger>
    );
};

export default MessengerContainer;