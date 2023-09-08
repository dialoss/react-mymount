import React from 'react';
import 'styles/modal/modal-elements/ModalInput.css';


const ModalInput = ({processInput, field}) => {
    return (
        <div className="modal-input__wrapper">
            <input name={field.name} value={field.value} onChange={(event) => {
                    processInput(event, field);
                }}/>
        </div>
    );
};

export default ModalInput;