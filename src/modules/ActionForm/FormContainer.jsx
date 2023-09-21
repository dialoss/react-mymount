import React, {useState} from 'react';
import {submitForm} from "./api/submitForm";
import {ModalManager} from "components/ModalManager";
import {useAddEvent} from "hooks/useAddEvent";
import {getFormData} from "./helpers/FormData";
import MyForm from "components/Modals/MyForm/MyForm";

const FormContainer = () => {
    const [formData, setData] = useState({data: {}});
    function handleFormData(event) {
        setData(getFormData(event.detail.type, event.detail.element));
    }
    useAddEvent('form-data', handleFormData);
    return (
        <ModalManager name={'form'}>
            <MyForm style={{background: {}}} formData={formData} submitCallback={submitForm}></MyForm>
        </ModalManager>
    );
};

export default FormContainer;