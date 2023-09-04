import React from 'react';
import ModalInput from "./ModalElements/ModalInput";
import ModalUpload from "./ModalElements/ModalUpload";
import ModalTextarea from "./ModalElements/ModalTextarea";
import ModalButton from "./ModalElements/ModalButton";
import ModalSelect from "./ModalElements/ModalSelect";

const ModalForm = () => {
    return (
        <div className={"modal-form"}>
            <ModalInput name={"display_pos"} value={"-1"} hidden></ModalInput>
            <ModalInput name={"tab_id"} value={"0"} hidden></ModalInput>
            <ModalInput name={"customer_email"}>Ваш email</ModalInput>
            <ModalInput name={"customer_name"}>Ваше имя</ModalInput>
            <ModalInput name={"customer_email"}>Ваш email</ModalInput>
            <ModalUpload type={"media"}>Медиа</ModalUpload>
            <ModalUpload type={"files"}>Файлы</ModalUpload>
            <ModalInput name={"new_page_slug"} required>Название страницы</ModalInput>
            <ModalTextarea name={"description"}>Описание</ModalTextarea>
            <ModalTextarea name={"title"}>Заголовок</ModalTextarea>
            <ModalInput name={"customer_email"}>Ваш email</ModalInput>
            <ModalInput name={"textfields"} value={"0"}>Количество текстовых полей</ModalInput>
            <ModalInput name={"price"}>Цена</ModalInput>
            <ModalSelect options={[
                ['empty', '---'],
                ['toggle_date', ''],
                ['toggle_shadow', ''],
                ['clear_position', 'Сбросить расположение'],
                ['clear_size', 'Сбросить размер'],
                ['clear_data', 'Стереть данные']
            ]}>Изменить значения</ModalSelect>
            <ModalButton text={"OK"}></ModalButton>
        </div>
    );
};

export default ModalForm;