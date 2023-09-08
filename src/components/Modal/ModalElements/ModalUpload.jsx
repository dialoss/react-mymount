import React from 'react';
import ModalButton from "./ModalButton";
import 'styles/modal/modal-elements/ModalUpload.css';


const ModalUpload = ({processInput, field}) => {
    return (
        <div className={"modal-upload"}>
            <input type="hidden" name={field.name} multiple hidden="hidden" value={field.value}/>
            <ModalButton text={field.text}></ModalButton>
            <span className="modal__file-text">{`No ${field.name} chosen...`}</span>
        </div>
    );
};

export default ModalUpload;