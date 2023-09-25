import React from 'react';
import ItemImage from "./Image/ItemImage";
import ItemTable from "./Table/ItemTable";
import ItemFile from "./File/ItemFile";
import ItemTextfield from "./Textfield/ItemTextfield";
import ItemVideo from "./Video/ItemVideo";
import Viewer from "./Model/Viewer";

const Components = {
    'image': ItemImage,
    'table': ItemTable,
    'video': ItemVideo,
    'file': ItemFile,
    'model': Viewer,
    'textfield': ItemTextfield,
}

const ItemData = ({data, ...props}) => {
    let TargetComponent = Components[data.type];

    return (
        <TargetComponent {...props} data={data} key={data.id}/>
    );
};

export default ItemData;