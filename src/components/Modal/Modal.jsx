import React from 'react';
import 'styles/modal/Modal.scss';

const Modal = ({opened, closeModal, modalStyles, children}) => {
    return (
        <div className={"modal"} style={modalStyles}>
            <div className={"modal__wrapper " + (opened ? "opened" : "")}>
                <div className="modal__background" onClick={(event) => {
                    event.stopPropagation();
                    closeModal();
                }}></div>
                <div className="modal__window">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;