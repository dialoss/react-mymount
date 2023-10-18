import { ref, uploadBytes } from "firebase/storage";
import {
    doc,
    addDoc,
    collection,
    updateDoc,
    onSnapshot,
    query,
    serverTimestamp, where, getDocs
} from "firebase/firestore";
import {useLayoutEffect, useRef, useState} from "react";
import {useAddEvent} from "hooks/useAddEvent";
import {db, storage} from "./config";
import {getFileType} from "components/GooglePicker/helpers/files";

export async function sendMessage(data) {
    await addDoc(collection(db, "rooms", data.room_id, "messages"), {
        user: data.user_id,
        value: data.message,
        time_sent: await serverTimestamp(),
    });
    updateDoc(doc(db, 'rooms', data.room_id), {lastMessage: data.message.text});
}

export async function uploadMedia(upload) {
    let data = {
        url: '',
        type: getFileType(upload.name),
        filename: upload.name,
    };
    const time = new Date().getTime()
    const uploadRef = ref(storage, 'messages/' + data.name + time + '.' + data.type);
    await uploadBytes(uploadRef, upload).then((snapshot) => {
        data.url = snapshot.metadata.fullPath;
    });
    return data;
}

export function useGetUsers() {
    const [users, setUsers] = useState({});
    useLayoutEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "users"), q => {
            let newUsers = {};
            q.docs.forEach(doc => {
                let user = doc.data();
                if (!user) return;
                newUsers[user.id] = {...user, id: doc.id};
            });
            setUsers(newUsers);
        });
        return () => unsubscribe;
    }, []);
    return users;
}

export function useGetRooms(user, users) {
    const [rooms, setRooms] = useState({});
    useLayoutEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "rooms"), where("users", "array-contains", user.email)), q => {
            let newRooms = {};
            q.docs.forEach(doc => {
                let room = doc.data();
                let id = doc.id;
                newRooms[id] = {...room, id};
            });
            setRooms(newRooms);
            console.log(newRooms)
        });
        return () => unsubscribe;
    }, []);
    useLayoutEffect(() => {
        let newRooms = {};
        Object.values(rooms).forEach(room => {
            if (!room) return;
            if (!room.picture || !room.title) {
                let email = Object.values(room.users).filter(e => e !== user.email)[0];
                let companion = Object.values(users).find(e => e.email === email);
                if (!email) companion = user;
                if (!companion) return;
                newRooms[room.id] = {...room, picture: companion.picture, title: companion.name};
            } else {
                newRooms[room.id] = room;
            }
        });
        setRooms(newRooms);
    }, [Object.keys(rooms).length]);
    return rooms;
}

export async function createRoom(usersInRoom) {
    await addDoc(collection(db, "rooms"), {
        users: usersInRoom.map(u => u.email),
        picture: '',
        title: '',
        lastMessage: '',
    }).then(room => {
        usersInRoom.forEach(user => {
            let userDoc = doc(db, 'users', user.id);
            updateDoc(userDoc, {'rooms': [...userDoc.rooms, room.id]});
        })
    });
}

export function useGetRoom(user, rooms) {
    const [room, setRoom] = useState({picture: '', title: '', id: '', lastMessage: ''});
    const ref = useRef();
    ref.current = rooms;

    function handleRoom(event) {
        if (!!Object.values(ref.current).length)
            setRoom(ref.current[event.detail]);
    }
    useAddEvent("messenger:set-room", handleRoom);

    return room;
}