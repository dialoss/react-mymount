import React from 'react';
import 'styles/modal/modal-elements/ModalOption.scss';


const ModalOption = ({value, text}) => {
    return (
        <option value={value}>{text}</option>
    );
};

export default ModalOption;