import React from 'react';
import 'styles/modal/modal-elements/ModalButton.scss';

const ModalButton = ({children, ...props}) => {
    return (
        <button {...props} className="modal-button">{children}</button>
    );
};

export default ModalButton;