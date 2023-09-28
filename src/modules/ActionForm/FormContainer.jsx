import React from 'react';
import {submitForm} from "./api/submitForm";
import {ModalManager} from "components/ModalManager";
import {useAddEvent} from "hooks/useAddEvent";
import {getFormData} from "./helpers/FormData";
import MyForm from "components/Modals/MyForm/MyForm";
import {triggerEvent} from "helpers/events";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "./store/reducer";

const FormContainer = () => {
    const windowName = "form-window:toggle";
    const form = useSelector(state => state.form);
    const dispatch = useDispatch();
    function handleFormData(event) {
        dispatch(actions.setForm({data:{}}));
        dispatch(actions.setForm(getFormData(event.detail.type, event.detail.element)));
        triggerEvent(windowName, {isOpened: true});
    }
    function handleFieldChange(event) {
        dispatch(actions.changeField(event.detail));
    }

    useAddEvent('form:field-changed', handleFieldChange);
    useAddEvent('form:set-data', handleFormData);
    return (
        <ModalManager name={windowName} key={windowName}>
            <MyForm formData={form} submitCallback={() => submitForm(form)}></MyForm>
        </ModalManager>
    );
};

export default FormContainer;