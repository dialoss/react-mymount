import React from 'react';
import FormButton from "./FormButton";
import FormUpload from "./FormUpload";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import FormSelect from "./FormSelect";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "store/reducers/changeForm";

const Components = {
    'button': FormButton,
    'upload': FormUpload,
    'input': FormInput,
    'textarea': FormTextarea,
    'select': FormSelect
}

const FormComponent = ({componentType, id}) => {
    let TargetComponent = Components[componentType];
    const dispatch = useDispatch();
    const field = useSelector((state) => state.form[id]);

    function componentCallback(event) {
        dispatch(actions.changeField({id, value:event.target.value}));
    }

    return (
        <TargetComponent data={{...field, callback: componentCallback}}/>
    );
};

export default FormComponent;