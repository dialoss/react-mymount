import React from 'react';

import 'styles/form/MyForm.scss';

import FormButton from "components/MyForm/FormElements/FormButton";
import FormComponent from "components/MyForm/FormElements/FormComponent";
import {useSelector} from "react-redux";

const FormBlock = ({formField}) => {
    return (
        <div className="form-block">
            <p>{formField.text}</p>
            <FormComponent componentType={formField.type} id={formField.id}></FormComponent>
        </div>
    );
}

const MyForm = () => {
    function submitForm() {
        console.log(form);
    }

    const form = useSelector((state) => state.form);

    return (
        <div className={"my-form"}>
            {
                form.map((formField, index) => {
                    return <FormBlock formField={{...formField, id:index}} key={index}/>
                })
            }
            <FormButton onClick={submitForm}>OK</FormButton>
        </div>
    );
};

export default MyForm;