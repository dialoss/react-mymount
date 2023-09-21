import React, {useState} from 'react';
import useKeypress from "react-use-keypress";
import Modal from "ui/Modal/Modal";
import {useAddEvent} from "hooks/useAddEvent";

const ModalManager = ({name, children}) => {
    const [isOpened, setOpened] = useState(false);
    useKeypress('Escape', (event) => {
        if (event.target.classList.contains("picker")) return;
        setOpened(false);
    });

    function toggleModal(state) {
        setOpened(state.detail.isOpened);
    }

    useAddEvent(name, toggleModal);

    return (
        <div className={"modal-manager"}>
            <Modal content={children}
                   isOpened={isOpened}
                   closeCallback={() => setOpened(false)}
                   key={children.name}></Modal>
        </div>
    );
}

export default ModalManager;