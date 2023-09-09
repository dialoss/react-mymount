import React from 'react';

import 'styles/form/MyForm.scss';

import ModalButton from "components/Modal/ModalElements/ModalButton";
import ModalComponent from "../Modal/ModalElements/ModalComponent";
import {useSelector} from "react-redux";

const FormBlock = ({formField}) => {
    return (
        <div className="form-block">
            <p>{formField.text}</p>
            <ModalComponent componentType={formField.type} id={formField.id}></ModalComponent>
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
            {/*<ModalSelect value={[*/}
            {/*    {name:'empty',          value:'---'},*/}
            {/*    {name:'toggle_date',    value:''},*/}
            {/*    {name:'toggle_shadow',  value:''},*/}
            {/*    {name:'clear_position', value:'Сбросить расположение'},*/}
            {/*    {name:'clear_size',     value:'Сбросить размер'},*/}
            {/*    {name:'clear_data',     value:'Стереть данные'}*/}
            {/*]}>Изменить значения</ModalSelect>*/}
            <ModalButton onClick={submitForm}>OK</ModalButton>
        </div>
    );
};

export default MyForm;