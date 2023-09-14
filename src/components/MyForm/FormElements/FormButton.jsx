import React from 'react';
import 'styles/form/form-elements/FormButton.scss';

const FormButton = ({children, ...props}) => {
    return (
        <button {...props} className="form-button">{children}</button>
    );
};

export default FormButton;