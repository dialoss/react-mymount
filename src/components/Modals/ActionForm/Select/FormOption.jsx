import React from 'react';
import 'styles/form/form-elements/FormOption.scss';


const FormOption = ({value, text, ...props}) => {
    return (
        <option {...props} value={value}>{text}</option>
    );
};

export default FormOption;