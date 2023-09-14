import React from 'react';
import FormOption from "./FormOption";

const FormSelect = ({data}) => {
    return (
        <select className="form-select" autoComplete="off" onChange={data.callback}>
            {
                data.attrs.map((option, index) => {
                    return <FormOption value={option.name} text={option.value} key={index}></FormOption>
                })
            }
        </select>
    );
};

export default FormSelect;