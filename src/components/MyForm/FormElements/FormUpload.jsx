import React, {useState} from 'react';
import 'styles/form/form-elements/FormUpload.scss';
import GooglePicker from "../../Utils/GooglePicker";

const FormUpload = ({data}) => {
    const [upload, setUpload] = useState([]);
    function setUploadedFiles(filesList) {
        setUpload(filesList);
    }
    return (
        <div className={"form-upload"}>
            <input onChange={data.callback}
                   name={data.name}
                   value={upload}
                   type="hidden" multiple hidden/>
            <GooglePicker uploadField={setUploadedFiles} className={"form-button"} text={data.text}/>
            {!(!!upload.length) && <span className="form-upload__text">{`No ${data.name} chosen...`}</span>}
            {!!upload.length && <div className={"upload__preview"}
                                     style={{display:"flex", flexWrap:"wrap", width:400}}>
                {
                    upload.map((file,index) =>
                        <div style={{width: "50%", padding:"5px"}} key={index}>
                            <img src={file.url} alt={""} style={{width: "100%"}}/>
                            <p style={{textAlign:"center"}}>{file.name}</p>
                        </div>
                    )
                }
            </div>}
        </div>
    );
};

export default FormUpload;