import React from 'react';
import ModalButton from "./ModalButton";
import 'styles/modal/modal-elements/ModalUpload.scss';

const ModalUpload = ({callback, data}) => {
    return (
        <div className={"modal-upload"}>
            <input onChange={callback}
                   name={data.name}
                   value={data.value}
                   type="hidden" multiple hidden/>
            <ModalButton text={data.text}></ModalButton>
            <span className="modal__file-text">{`No ${data.name} chosen...`}</span>
        </div>
    );
};

export default ModalUpload;