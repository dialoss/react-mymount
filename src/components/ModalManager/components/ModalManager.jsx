import React from 'react';
import useKeypress from "react-use-keypress";
import Modal from "ui/Modal/Modal";
import {closeAllModals} from "../controller";

const ModalManager = ({children}) => {
    useKeypress('Escape', (event) => {
        if (event.target.classList.contains("picker")) return;
        closeAllModals();
    });

    return (
        <div className={"modal-manager"}>
            <Modal content={children}
                   isOpened={false}
                   closeCallback={children.closeCallback}
                   key={children.name}></Modal>
        </div>
    );
}

export default ModalManager;