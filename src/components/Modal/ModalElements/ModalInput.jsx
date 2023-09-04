import React from 'react';

const ModalInput = ({name, value='0', ...props}) => {
    return (
        <div className="modal-input__wrapper">
            <input name={name} value={value} />
        </div>
    );
};

export default ModalInput;