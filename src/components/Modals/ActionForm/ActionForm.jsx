import React from 'react';

import 'styles/form/MyForm.scss';

import FormComponent from "./FormComponent";
import WindowButton from "ui/Buttons/WindowButton/WindowButton";
import ActionButton from "ui/Buttons/ActionButton/ActionButton";

const FormBlock = ({formField, id}) => {
    return (
        <div className="form__block">
            {formField.type !== "upload" && <p>{formField.text}</p>}
            <FormComponent id={id} field={formField}></FormComponent>
        </div>
    );
}

const MyForm = ({formData, submitCallback}) => {
    return (
        <div className="form__content">
            <div className="form__header">
                <p className={"form__title"}>{formData.title}</p>
                <WindowButton callback={() => changeModal('form', {isOpened:false})}
                                 className={"form__close-btn"} type={'close'}/>
            </div>
            <div className={"form__fields"}>
                {
                    Object.keys(formData.data).map((index) => {
                        return <FormBlock formField={formData.data[index]} id={index} key={index}/>
                    })
                }
                <ActionButton onClick={submitCallback}>{formData.button}</ActionButton>
            </div>
        </div>
    );
};

export default MyForm;