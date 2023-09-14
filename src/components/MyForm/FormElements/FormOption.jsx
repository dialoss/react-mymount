import React from 'react';
import 'styles/form/form-elements/FormOption.scss';


const FormOption = ({value, text}) => {
    return (
        <option value={value}>{text}</option>
    );
};

export default FormOption;