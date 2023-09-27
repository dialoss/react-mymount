import React, {Fragment} from 'react';
import ItemVideo from "components/Entry/components/Item/components/Video/ItemVideo";
import ItemFile from "components/Entry/components/Item/components/File/ItemFile";
import ItemImage from "components/Entry/components/Item/components/Image/ItemImage";
import "./FormMedia.scss";
import Viewer from "components/Entry/components/Item/components/Model/Viewer";

const Components = {
    'video': ItemVideo,
    'file': ItemFile,
    'image': ItemImage,
    'model': Viewer,
};

const FormMedia = ({files}) => {
    return (
        <div className={"upload__preview"}
                                 style={{display:"flex", flexWrap:"wrap", justifyContent:"center", width:400}}>
            {
                Object.values(files).map((file,index) =>
                    <div className={"media-item"} key={index}>
                        {React.createElement(Components[file.type], {data: file})}
                        <p className={"media-text"}>{file.filename}</p>
                    </div>
                )
            }
        </div>
    );
}

export default FormMedia;