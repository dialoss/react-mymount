import React from 'react';
import CloseButton from "../UI/Buttons/CloseButton";
import ModalForm from "./ModalForm";
import 'styles/modal/Modal.css';

const Modal = ({opened, toggleModal}) => {
    function closeModal(event) {
        event.stopPropagation();
        toggleModal(false);
    }
    return (
        <div className="modal">
            <div className={"modal__wrapper " + (opened ? "opened" : "")}>
                <div className="modal__background" onClick={closeModal}></div>
                <div className="modal__window">

                </div>
            </div>
        </div>
    );
};

export default Modal;