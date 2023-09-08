import React from 'react';
import CloseButton from "../../../UI/Buttons/CloseButton";
import ModalForm from "../../ModalForm";

const ModalActions = () => {
    return (
        <div className={"modal-actions"}>
            <div className="modal__content">
                <ModalForm></ModalForm>
            </div>
        </div>
    );
};

export default ModalActions;