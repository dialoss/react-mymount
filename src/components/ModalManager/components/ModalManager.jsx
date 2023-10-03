import React, {useEffect, useRef, useState} from 'react';
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
        if (state.detail.toggle) setOpened(opened => !opened);
        else setOpened(state.detail.isOpened);
    }

    useAddEvent(name, toggleModal);

    const ref = useRef();
    useEffect(() => {
        ref.current.querySelectorAll(".window-close").forEach(button => {
            button.addEventListener("click", () => setOpened(false));
        });
    }, [children]);

    return (
        <div className={"modal-manager"} ref={ref}>
            <Modal content={children}
                   isOpened={isOpened}
                   closeCallback={() => setOpened(false)}
                   key={children.name}>
            </Modal>
        </div>
    );
}

export default ModalManager;