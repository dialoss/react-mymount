import React from 'react';
import FormUpload from "./Upload/FormUpload";
import FormInput from "components/Modals/MyForm/Input/FormInput";
import FormTextarea from "components/Modals/MyForm/Textarea/FormTextarea";
import FormSelect from "./Select/FormSelect";

const Components = {
    'upload': FormUpload,
    'input': FormInput,
    'textarea': FormTextarea,
    'select': FormSelect
}

const FormComponent = ({field}) => {
    let TargetComponent = Components[field.type];

    function componentCallback(event) {
         field.changeField({value:event.target.value});
    }

    return (
        <TargetComponent data={{...field, callback: componentCallback}}/>
    );
};

export default FormComponent;