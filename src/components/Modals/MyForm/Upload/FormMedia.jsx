import React from 'react';
import ItemVideo from "components/Entry/components/Item/components/Video/ItemVideo";
import ItemFile from "components/Entry/components/Item/components/File/ItemFile";
import ItemImage from "components/Entry/components/Item/components/Image/ItemImage";

const Components = {
    'video': ItemVideo,
    'file': ItemFile,
    'image': ItemImage,
};

const FormMedia = ({files}) => {
    return (
        <div className={"upload__preview"}
                                 style={{display:"flex", flexWrap:"wrap", justifyContent:"center", width:400}}>
            {
                Object.values(files).map((file,index) =>
                    <div style={{width: "50%", padding:"5px"}} key={index}>
                        {React.createElement(Components[file.type], {data: file})}
                        <p style={{textAlign:"center"}}>{file.filename}</p>
                    </div>
                )
            }
        </div>
    );
}

export default FormMedia;