import React from 'react';

const ModalTextarea = ({name, value}) => {
    return (
        <div className="modal-textarea__wrapper">
            <textarea className="modal__textarea" name={name} value={value}></textarea>
        </div>
    );
};

export default ModalTextarea;