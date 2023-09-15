import React from 'react';

import 'styles/form/MyForm.scss';

import FormButton from "components/MyForm/FormElements/FormButton";
import FormComponent from "components/MyForm/FormElements/FormComponent";
import {useSelector} from "react-redux";
import {changeModal} from "../Modal/changeModal";
import ButtonComponent from "../UI/Buttons/ButtonComponent";
import {submitForm} from "scripts/network/requests";

const FormBlock = ({formField, id}) => {
    return (
        <div className="form-block">
            {formField.type !== "upload" && <p>{formField.text}</p>}
            <FormComponent id={id} componentType={formField.type}></FormComponent>
        </div>
    );
}

const MyForm = () => {
    let form = useSelector((state) => state.modal['form']);
    form = {...form};

    return (
        <div className="form__content">
            <div className="form__header">
                <p className={"form__title"}>{form.title}</p>
                <ButtonComponent callback={() => changeModal('form', {isOpened:false})}
                                 className={"form__close-btn"} type={'close'}/>
            </div>
            <div className={"form__fields"}>
                {
                    Object.keys(form.data).map((index) => {
                        return <FormBlock formField={form.data[+index]} id={index} key={index}/>
                    })
                }
                <FormButton onClick={() => submitForm(form.data)}>{form.button}</FormButton>
            </div>
        </div>
    );
};

export default MyForm;