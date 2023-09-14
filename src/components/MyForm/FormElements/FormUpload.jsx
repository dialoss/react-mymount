import React from 'react';
import FormButton from "./FormButton";
import 'styles/form/form-elements/FormUpload.scss';

const FormUpload = ({data}) => {
    return (
        <div className={"form-upload"}>
            <input onChange={data.callback}
                   name={data.name}
                   value={data.value}
                   type="hidden" multiple hidden/>
            <FormButton>{data.text}</FormButton>
            <span className="form-upload__text">{`No ${data.name} chosen...`}</span>
        </div>
    );
};

export default FormUpload;