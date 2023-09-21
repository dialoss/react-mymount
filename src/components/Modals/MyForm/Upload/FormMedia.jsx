import React from 'react';

const FormMedia = ({files}) => {
    return (
        <div className={"upload__preview"}
                                 style={{display:"flex", flexWrap:"wrap", justifyContent:"center", width:400}}>
            {
                Object.values(files).map((file,index) =>
                    <div style={{width: "50%", padding:"5px"}} key={index}>
                        <img src={file.url} alt={""} style={{width: "100%"}}/>
                        <p style={{textAlign:"center"}}>{file.name}</p>
                    </div>
                )
            }
        </div>
    );
}

export default FormMedia;