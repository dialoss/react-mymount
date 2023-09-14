import React from 'react';
import 'styles/form/form-elements/FormTextarea.scss';

const FormTextarea = ({data}) => {
    return (
        <textarea className="form-textarea" name={data.name} value={data.value} onChange={data.callback}></textarea>
    );
};

export default FormTextarea;