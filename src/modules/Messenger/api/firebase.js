import {initializeApp} from "firebase/app";
import {getAuth, signInWithCustomToken} from "firebase/auth";
import {
    addDoc,
    collection,
    getDocs,
    getFirestore,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp, where
} from "firebase/firestore";
import {useSelector} from "react-redux";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useAddEvent} from "hooks/useAddEvent";
import {firebaseConfig} from "./config";

const adminEmail = 'matthewwimsten@gmail.com';

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app);

export function login(token) {
    signInWithCustomToken(auth, token);
}

export async function sendMessage(data) {
    if (data.message.length === 0) return;
    const time = await serverTimestamp();
    const docRef = await addDoc(collection(db, "rooms", data.room_id, "messages"), {
        user: data.user_id,
        value: data.message,
        time_sent: time,
        type: '',
    });
    console.log("Document written with ID: ", docRef.id);
}

export function useAuthorize() {
    const user = useSelector(state => state.user);
    const ref = useRef();
    ref.current = user;
    const token = user.firebase;
    useEffect(() => {
        if (!token) return;
        login(token);
    }, [token]);
    return ref;
}

export function useSubscribe(room) {
    const [messages, setMessages] = useState([]);
    useLayoutEffect(() => {
        if (!room.current.id) return;
        const unsubscribe = onSnapshot(query(collection(db, "rooms", room.current.id, "messages"), orderBy('time_sent')), query => {
            let newMessages = [];
            query.forEach((doc) => {
                newMessages.push({...doc.data(), id: doc.id});
            });
            setMessages(newMessages);
            console.log(newMessages);
        });

        return () => unsubscribe;
    }, [room.current]);
    return messages;
}

export function useGetUsers(user) {
    const [users, setUsers] = useState({});
    const ref = useRef();
    ref.current = users;
    useLayoutEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "users"), q => {
            let newUsers = {};
            q.docs.forEach(doc => {
                let userData = doc.data();
                if (!userData.id) return;
                if (userData.id === user.current.id) userData.current = true;
                newUsers[userData.id] = userData;
            });
            console.log('users',newUsers);
            setUsers(newUsers);
        });

        return () => unsubscribe;
    }, []);
    return ref;
}

export function useGetRooms(user, users) {
    const [rooms, setRooms] = useState({});
    const ref = useRef();
    ref.current = rooms;
    useLayoutEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "rooms"), q => {
            let newRooms = {};
            q.docs.forEach(doc => {
                if (!Object.values(doc.data()).length) return;
                let room = doc.data();
                if (!room.users.includes(user.current.email)) return;

                newRooms[doc.id] = {...doc.data(), id:doc.id};
            });
            console.log('rooms',newRooms);
            setRooms(newRooms);
        });
        return () => unsubscribe;
    }, []);
    useLayoutEffect(() => {
        let newRooms = {};
        Object.values(rooms).forEach(room => {
            let id = room.id;
            let email = Object.values(room.users).filter(e => e !== user.current.email)[0];
            let companion = Object.values(users.current).find(e => e.email === email);
            if (!email) companion = user.current;
            if (!companion) return;

            newRooms[id] = {...room, title: companion.name, picture: companion.picture};
        });
        console.log('rooms',newRooms);
        setRooms(newRooms);
    }, [users.current]);
    return ref;
}

async function createUser(user) {
    await addDoc(collection(db, "rooms"), {
        users: [adminEmail, user.email],
        picture: '',
        title: '',
    }).then((roomDoc) => {
        addDoc(collection(db, "users"), {
            id: user.id,
            email: user.email,
            name: user.name,
            picture: user.picture,
            rooms: [roomDoc.id],
        });
    });
}

export function useGetRoom(user, rooms) {
    const [room, setRoom] = useState({
        id: '',
        picture: '',
        title: '',
    });
    const ref = useRef();
    ref.current = room;

    useLayoutEffect(() => {
        if (!user.current.email || Object.values(rooms.current).length === 0) return;
        getDocs(query(collection(db, "users"), where('email', '==', user.current.email))).then(async (q) => {
            if (q.empty) {
                await createUser(user.current);
            } else {
                let id = q.docs[0].data().rooms[0];
                setRoom({...rooms.current[id]});
            }
            console.log('room',ref.current)
        });
    }, [user.current, rooms.current]);

    function handleRoom(event) {
        setRoom({...rooms.current[event.detail]});
    }

    useAddEvent("messenger:set-room", handleRoom);
    return ref;
}

export function useMessage(user, room) {
    const [message, setMessage] = useState('');
    const ref = useRef();
    ref.current = message;

    function handleMessage(event) {
        if (event.key === 'Enter') {
            if (!user.current.email) return;
            sendMessage({
                message: structuredClone(ref.current),
                user_id: user.current.id,
                room_id: room.current.id,
            });
            setMessage('');
        }
    }

    useAddEvent("keydown", handleMessage);

    return {value: message, callback: setMessage};
}