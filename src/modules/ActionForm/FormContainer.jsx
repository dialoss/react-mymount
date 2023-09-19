import React from 'react';
import ActionForm from "components/Modals/ActionForm/ActionForm";
import {submitForm} from "./api/submitForm";

const FormContainer = () => {
    submitForm({});
    return (
        <ActionForm></ActionForm>
    );
};

export default FormContainer;