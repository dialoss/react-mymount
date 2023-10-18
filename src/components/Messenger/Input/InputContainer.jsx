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
    ref.current = {text, upload};

    async function handleMessage() {
        let {text, upload} = ref.current;
        if (!text.trim() && !upload.length) return;
        let uploadData = {};
        if (upload.length) {
            uploadData = await uploadMedia(upload.target.files);
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
        if (event.keyCode === 13) {
            handleMessage();
        }
    }
    useAddEvent("keydown", handleKeydown);

    return (
        <MessengerInput message={{text, upload}}
                        sendCallback={handleMessage}
                        textCallback={setText}
                        uploadCallback={setUpload}
        ></MessengerInput>
    );
};

export default InputContainer;