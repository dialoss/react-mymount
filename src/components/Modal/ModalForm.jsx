import React, {useState} from 'react';
import ModalInput from "./ModalElements/ModalInput";
import ModalUpload from "./ModalElements/ModalUpload";
import ModalTextarea from "./ModalElements/ModalTextarea";
import ModalButton from "./ModalElements/ModalButton";
import ModalSelect from "./ModalElements/ModalSelect";

import 'styles/modal/ModalForm.css';

class FormField {
    constructor(id, name, text, attrs, type, value) {
        this.id = id;
        this.name = name;
        this.text = text;
        this.attrs = attrs;
        this.type = type;
        this.value = value;
    }
}

const ModalForm = () => {
    let emptyForm = [
        new FormField(1,'display_pos',    '',           ['hidden'], 'input', '-1'),
        new FormField(2,"tab_id",         '',           ['hidden'], 'input',  '0'),
        new FormField(3,"customer_email", 'Ваш email',  {},'input', ''),
        new FormField(4,"customer_name",  'Ваше имя',   {},'input', ''),
        new FormField(5,"media",          'Медиа',      {},'upload',[]),
        new FormField(6,"files",          'Файлы',      {},'upload',[]),
        new FormField(7,"new_page_slug",  'Название страницы', ['required'], 'input', ''),
        new FormField(8,"description",    'Описание',   {},'textarea', ''),
        new FormField(9,"title",          'Заголовок',  {},'textarea', ''),
        new FormField(10, "textfields",   'Количество текстовых полей', {},'input','0'),
        new FormField(11, "price",        'Цена',       {},'input', '')
    ];
    const [form, changeForm] = useState(emptyForm);
    function processInput(event, field) {
        let updatedForm = [...form];
        updatedForm[field.id - 1].value = event.target.value;
        changeForm(updatedForm);
    }
    function submitForm() {
        console.log(form);
    }
    return (
        <div className={"modal-form"}>
            {
                form.map((formField, index) => {
                    switch (formField.type) {
                        case "input":
                            return <ModalInput processInput={processInput} field={form[index]} key={index}></ModalInput>
                        case "upload":
                            return <ModalUpload processInput={processInput} field={form[index]} key={index}></ModalUpload>
                        case "textarea":
                            return <ModalTextarea processInput={processInput} field={form[index]} key={index}></ModalTextarea>
                    }
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

export default ModalForm;