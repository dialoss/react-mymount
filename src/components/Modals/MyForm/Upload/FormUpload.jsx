import React, {useEffect, useState} from 'react';
import './FormUpload.scss';
import FormMedia from "./FormMedia";
import GooglePicker from "components/GooglePicker/GooglePicker";

const FormUpload = ({data}) => {
    const [upload, setUpload] = useState([]);
    useEffect(() => {
        setUpload(data.value);
    }, [data]);
    function setUploadedFiles(filesList) {
        setUpload(filesList);
    }
    return (
        <div className={"form-upload"}>
            <input onChange={data.callback}
                   name={data.name}
                   type="hidden" multiple hidden/>
            <GooglePicker uploadField={setUploadedFiles} className={"form-button"} text={data.text}/>
            {!(!!upload.length) && <span className="form-upload__text">{`No ${data.name} chosen...`}</span>}
            {!!upload.length && <FormMedia files={upload}/>}
        </div>
    );
};

export default FormUpload;