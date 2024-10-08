import React from 'react';
import './FormInput.scss';

const FormInput = ({data}) => {
    let attrs = {};
    data.attrs && data.attrs.forEach(attr => {
        attrs[attr] = attr;
    });
    return (
        <input {...attrs}
                placeholder={data.placeholder || ''}
               name={data.name}
               value={data.value}
               onChange={data.callback}
               className="form-input"/>
    );
};

export default FormInput;