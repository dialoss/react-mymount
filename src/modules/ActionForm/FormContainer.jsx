import React from 'react';
import ActionForm from "components/Modals/ActionForm/ActionForm";
import {submitForm} from "./api/submitForm";
import {ModalManager} from "components/ModalManager";

const FormContainer = () => {

    return (
        <ModalManager name={'form'}>
            <ActionForm formData={} submitCallback={submitForm}></ActionForm>
        </ModalManager>
    );
};

export default FormContainer;