import React from 'react';
import ItemImage from "./Image/ItemImage";
import ItemTable from "./Table/ItemTable";
import ItemFile from "./File/ItemFile";
import ItemTextfield from "./Textfield/ItemTextfield";
import ItemVideo from "./Video/ItemVideo";

const Components = {
    'images': ItemImage,
    'tables': ItemTable,
    'videos': ItemVideo,
    'files': ItemFile,
    'textfields': ItemTextfield,
}

const ItemData = ({data}) => {
    let TargetComponent = Components[data.type];

    return (
        <TargetComponent data={data}/>
    );
};

export default ItemData;