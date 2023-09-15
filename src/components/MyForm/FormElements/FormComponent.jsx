import React from 'react';
import FormButton from "./FormButton";
import FormUpload from "./FormUpload";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import FormSelect from "./FormSelect";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "store/reducers/modal";

const Components = {
    'button': FormButton,
    'upload': FormUpload,
    'input': FormInput,
    'textarea': FormTextarea,
    'select': FormSelect
}

const FormComponent = ({componentType, id}) => {
    let TargetComponent = Components[componentType];
    const field = useSelector((state) => state.modal['form'].data[id]);
    const dispatch = useDispatch();
    function componentCallback(event) {
        dispatch(actions.changeForm( {id, value:event.target.value}));
    }

    return (
        <TargetComponent data={{...field, callback: componentCallback}}/>
    );
};

export default FormComponent;