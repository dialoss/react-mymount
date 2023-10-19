import React, {useLayoutEffect, useState} from 'react';
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {appName, base} from "../api/config";
import MessagesField from "./components/MessagesField";

function getMessages(room, setMessages) {
    if (!room.id) return () => {};
    return onSnapshot(query(collection(base, "rooms", room.id, 'messages'), orderBy('time_sent')), query => {
        let newMessages = [];
        query.forEach((doc) => {
            let msg = doc.data();
            let url = msg.value.upload.url;
            if (!!url) {
                let name = url.split('/').slice(-1)[0];
                msg.value.upload.url =
                    `https://firebasestorage.googleapis.com/v0/b/mymount-d1cad.appspot.com/o/${appName}%2Fmessages%2F${name}?alt=media`
            }
            newMessages.push({...msg, id: doc.id});
        });
        setMessages(newMessages);
    });
}

const MessagesContainer = ({room}) => {
    const [messages, setMessages] = useState([]);
    const [unsubscribe, setUnsubscribe] = useState(() => () => {});
    useLayoutEffect(() => {
        unsubscribe();
        setUnsubscribe(() => getMessages(room, setMessages));
    }, [room]);

    return (
        <MessagesField messages={messages} empty={!room.id}></MessagesField>
    );
};

export default MessagesContainer;