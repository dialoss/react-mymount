import React, {useContext, useLayoutEffect, useState} from 'react';
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {db} from "../api/config";
import MessagesField from "./components/MessagesField";
import {MessengerContext} from "../MessengerContainer";

const MessagesContainer = ({room}) => {
    const [messages, setMessages] = useState([]);
    useLayoutEffect(() => {
        if (!room.id) return;
        const unsubscribe = onSnapshot(query(collection(db, "rooms", room.id, "messages"), orderBy('time_sent')), query => {
            let newMessages = [];
            query.forEach((doc) => {
                let msg = doc.data();
                let url = msg.url;
                if (!!url) {
                    let name = url.split('/').slice(-1)[0];
                    msg.url = `https://firebasestorage.googleapis.com/v0/b/mymount-d1cad.appspot.com/o/messages%2F${name}?alt=media`
                }
                newMessages.push({...msg, id: doc.id});
            });
            setMessages(newMessages);
            console.log(newMessages)
        });
        return () => unsubscribe;
    }, [room]);

    return (
        <MessagesField messages={messages} empty={!room.id}></MessagesField>
    );
};

export default MessagesContainer;