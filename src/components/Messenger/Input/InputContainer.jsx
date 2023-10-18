import React, {useContext, useRef, useState} from 'react';
import {useAddEvent} from "../../../hooks/useAddEvent";
import {sendMessage, uploadMedia} from "../api/firebase";
import MessengerInput from "./MessengerInput";
import {MessengerContext} from "../MessengerContainer";

const InputContainer = ({room}) => {
    const {user} = useContext(MessengerContext);
    const [text, setText] = useState('');
    const [upload, setUpload] = useState([]);
    const ref = useRef();
    ref.current = {text, upload, room};

    async function handleMessage() {
        let {text, upload, room} = ref.current;
        if (!text.trim() && !upload.length) return;
        let uploadData = {};
        if (!!upload.length) {
            uploadData = await uploadMedia(upload);
        }
        sendMessage({
            message: {
                text,
                upload: uploadData,
            },
            user_id: user.id,
            room_id: room.id,
        });
        setText('');
        setUpload([]);
    }

    function handleKeydown(event) {
        if (event.detail.keyCode === 13) {
            handleMessage();
        }
    }
    useAddEvent("messenger:keydown", handleKeydown);

    return (
        <MessengerInput message={{text, upload}}
                        sendCallback={handleMessage}
                        textCallback={setText}
                        uploadCallback={(v) => setUpload(Object.values(v.target.files))}
        ></MessengerInput>
    );
};

export default InputContainer;