import React from 'react';
import CloseButton from "../UI/Buttons/CloseButton";
import ModalForm from "./ModalForm";

const Modal = (props) => {
    function closeModal(event) {
        event.stopPropagation();
        props.toggleModal(false);
    }
    return (
        <div className="modal">
            <div className="modal__wrapper">
                <div className="modal__background" onClick={closeModal}></div>
                <div className="modal__window">
                    <div className="modal__header">
                        <CloseButton></CloseButton>
                        <p className={"modal__title"}>Редактировать запись</p>
                    </div>
                    <div className="modal__content">
                        <ModalForm></ModalForm>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;