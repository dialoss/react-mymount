import { ref, uploadBytes } from "firebase/storage";
import {
    doc,
    addDoc,
    getDoc,
    collection,
    updateDoc,
    onSnapshot,
    query,
    serverTimestamp, where
} from "firebase/firestore";
import {useLayoutEffect, useRef, useState} from "react";
import {useAddEvent} from "hooks/useAddEvent";
import {adminEmail, appName, base, storage} from "./config";
import {getFileType} from "components/GooglePicker/helpers/files";
import store from "../../../store";

export async function sendMessage(data) {
    await addDoc(collection(base, "rooms", data.room_id, "messages"), {
        user: data.user_id,
        value: data.message,
        time_sent: await serverTimestamp(),
    }).then(d => updateDoc(doc(base, 'rooms', data.room_id), {lastMessage: d.id, newMessage: true}));
}

export async function uploadMedia(uploads) {
    let upload = uploads[0];
    let data = {
        url: '',
        type: getFileType(upload.name),
        filename: upload.name,
    };
    const time = new Date().getTime()
    const uploadRef = ref(storage, appName + '/messages/' + data.filename + time + '.' + data.type);
    await uploadBytes(uploadRef, upload).then((snapshot) => {
        data.url = snapshot.metadata.fullPath;
    });
    return data;
}

export function useGetUsers() {
    const [users, setUsers] = useState({});
    useLayoutEffect(() => {
        const unsubscribe = onSnapshot(collection(base, 'users'), q => {
            let newUsers = {};
            q.docs.forEach(doc => {
                let user = doc.data();
                if (!Object.values(user).length) return;
                newUsers[doc.id] = {...user, id: doc.id};
            });
            setUsers(newUsers);
        });
        return () => unsubscribe;
    }, []);
    return users;
}

async function changeRoomData(room, user, users) {
    if (!room) return;
    let msgid = room.lastMessage;
    if (!!msgid) {
        await getDoc(doc(base, 'rooms', room.id, "messages", msgid)).then(d => {
            console.log(d.data());
            room.lastMessage = d.data();
        });
    }
    if (!room.picture || !room.title) {
        let email = Object.values(room.users).filter(e => e !== user.email)[0];
        let companion = Object.values(users).find(e => e.email === email);
        if (!email) companion = user;
        if (!companion) return room;
        return {...room, picture: companion.picture, title: companion.name};
    } else {
         return room;
    }
}

export function useGetRooms(user, users) {
    const [rooms, setRooms] = useState({});
    useLayoutEffect(() => {
        if (!user.email) return;
        const unsubscribe = onSnapshot(query(collection(base, 'rooms'),
            where("users", "array-contains", user.email)), async q => {
            let currentRooms = q.docs.map(d => ({...d.data(), id:d.id}));

            if (!currentRooms.length && Object.keys(users).length) {
                let u = [user, Object.values(users).filter(u => u.email === adminEmail)[0]].filter(Boolean);
                if (u.length > 1) {
                    let baseRoom = await createRoom(u);
                    currentRooms = [baseRoom];
                }
            }
            Promise.all(currentRooms.map(r => changeRoomData(r, user, users))).then(d => {
                let newRooms = {};
                d.forEach(r => {
                    newRooms[r.id] = {...r, id: r.id};
                });
                setRooms(newRooms);
                console.log('new rooms', newRooms);
            })
        });
        return () => unsubscribe;
    }, [users]); // FIX UNNECESSARY UPDATES
    return [rooms, setRooms];
}

export async function createRoom(usersInRoom) {
    let room = null;
    const roomData = {
        users: usersInRoom.map(u => u.email),
        picture: '',
        title: '',
        lastMessage: '',
        newMessage: false,
    };
    await addDoc(collection(base, "rooms"), roomData).then(r => {
        usersInRoom.forEach(async user => {
            let userDoc = doc(base, 'users', user.id);
            let data = (await getDoc(userDoc)).data();
            updateDoc(userDoc, {'rooms': [...data.rooms, r.id]});
        });
        room = {...roomData, id: r.id};
    });
    console.log('created room', room)
    return room;
}

const emptyRoom = {picture: '', title: '', id: '', lastMessage: ''};

export function useGetRoom(user, rooms, setRooms) {
    const [room, setRoom] = useState(emptyRoom);
    const ref = useRef();
    ref.current = rooms;

    useLayoutEffect(() => {
        if (!!room.id && rooms[room.id].newMessage) {
            updateRoom({detail: room.id});
        }
    }, [rooms]);

    function setCurrentRoom(event) {
        let id = event.detail;
        if (!id) setRoom(emptyRoom);
        else if (!!Object.values(ref.current).length) {
            setRoom(ref.current[id]);
        }
    }

    function updateRoom(event) {
        let id = event.detail;
        if (!id) return;
        let room = ref.current[id];
        if (room.lastMessage.user === user.id) return;
        setRooms(rooms => {
            let newRooms = {...rooms};
            newRooms[id].newMessage = false;

            let room = doc(base, 'rooms', id);
            updateDoc(room, {'newMessage': false});

            return newRooms;
        })
    }
    useAddEvent("messenger:update-room", updateRoom);
    useAddEvent("messenger:set-room", setCurrentRoom);
    console.log('current room', room)
    return room;
}