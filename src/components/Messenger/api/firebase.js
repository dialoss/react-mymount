import { ref, uploadBytes } from "firebase/storage";
import {
    addDoc,
    collection,
    getDocs,
    onSnapshot,
    query,
    serverTimestamp, where
} from "firebase/firestore";
import {useLayoutEffect, useState} from "react";
import {useAddEvent} from "hooks/useAddEvent";
import {db, storage} from "./config";
import {getFileType} from "components/GooglePicker/helpers/files";

export async function sendMessage(data) {
    await addDoc(collection(db, "rooms", data.room_id, "messages"), {
        user: data.user_id,
        value: data.message,
        time_sent: await serverTimestamp(),
    });
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
                if (!user || !user.id) return;
                newUsers[user.id] = user;
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
                if (!room.picture || !room.title) {
                    let email = Object.values(room.users).filter(e => e !== user.email)[0];
                    let companion = Object.values(users).find(e => e.email === email);
                    if (!email) companion = user.current;
                    if (!companion) return;
                    room.picture = companion.picture;
                    room.title = companion.name;
                }
                newRooms[id] = {...room, id};
            });
            setRooms(newRooms);
            console.log(newRooms)
        });
        return () => unsubscribe;
    }, [users]);
    // useLayoutEffect(() => {
    //     let newRooms = {};
    //     Object.values(rooms).forEach(room => {
    //         if (!room) return;
    //         if (!room.picture || !room.title) {
    //             let email = Object.values(room.users).filter(e => e !== user.email)[0];
    //             let companion = Object.values(users).find(e => e.email === email);
    //             if (!email) companion = user.current;
    //             if (!companion) return;
    //             newRooms[room.id] = {...room, picture: companion.picture, title: companion.name};
    //         } else {
    //             newRooms[room.id] = room;
    //         }
    //     });
    //     setRooms(newRooms);
    // }, []);
    return rooms;
}

async function createUser(user) {
    addDoc(collection(db, "users"), {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        rooms: [],
    });
}

async function createRoom(usersInRoom) {
    await addDoc(collection(db, "rooms"), {
        users: usersInRoom,
        picture: '',
        title: '',
    });
}

export function useGetRoom(user, rooms) {
    const [room, setRoom] = useState({picture: '', title: '', id: 'IpCTTKV8vdsFWsvl077W', });

    useLayoutEffect(() => {
        getDocs(query(collection(db, "users"), where('email', '==', user.email))).then(async (q) => {
            if (q.empty) {
                await createUser(user);
            } else {
                // let id = q.docs[0].data().rooms[0];
                // setRoom(id);
            }
        });
    }, [user]);

    function handleRoom(event) {
        if (rooms) setRoom(rooms[event.detail]);
        console.log(event.detail)
    }
    useAddEvent("messenger:set-room", handleRoom);

    return room;
}