import React, {useEffect, useRef, useState} from 'react';
import useKeypress from "react-use-keypress";
import Modal from "ui/Modal/Modal";
import {useAddEvent} from "hooks/useAddEvent";

const ModalManager = ({name, children, callback=null, defaultOpened=false, closeConditions=['bg', 'btn', 'esc']}) => {
    const [isOpened, setOpened] = useState(defaultOpened);
    useKeypress('Escape', (event) => {
        if (event.target.classList.contains("picker") || !closeConditions.includes('esc')) return;
        setOpened(false);
    });

    function toggleModal(state) {
        if (state.detail.toggle) setOpened(opened => !opened);
        else setOpened(state.detail.isOpened);
    }

    function backgroundClick() {
        if (closeConditions.includes('bg')) setOpened(false);
    }

    useAddEvent(name, toggleModal);

    const ref = useRef();
    useEffect(() => {
        if (closeConditions.includes('btn')) ref.current.querySelectorAll(".window-close").forEach(button => {
            button.addEventListener("click", () => setOpened(false));
        });
    }, [children]);

    useEffect(() => {
        if (callback) callback(isOpened);
    }, [isOpened]);

    return (
        <div className={"modal-manager"} ref={ref}>
            <Modal content={children}
                   isOpened={isOpened}
                   closeCallback={backgroundClick}
                   key={name}>
            </Modal>
        </div>
    );
}

export default ModalManager;