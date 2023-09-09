import React from 'react';
import ItemImage from "./ItemImage";
import ItemTable from "./ItemTable";
import ItemFile from "./ItemFile";
import ItemTextfield from "./ItemTextfield";
import ItemVideo from "./ItemVideo";

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