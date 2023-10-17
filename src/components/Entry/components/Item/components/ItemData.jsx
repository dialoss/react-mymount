import React, {useCallback, useEffect} from 'react';
import ItemImage from "./Image/ItemImage";
import ItemTable from "./Table/ItemTable";
import ItemFile from "./File/ItemFile";
import ItemTextfield from "./Textfield/ItemTextfield";
import ItemVideo from "./Video/ItemVideo";
import Viewer from "./Model/Viewer";
import {triggerEvent} from "helpers/events";

export const Components = {
    'image': ItemImage,
    'table': ItemTable,
    'video': ItemVideo,
    'file': ItemFile,
    'model': Viewer,
    'textfield': ItemTextfield,
}

const ItemData = ({data, props}) => {
    const loadCallback = () =>
        triggerEvent("container:init", {container: props.container, item: props.itemTransform});
    useEffect(() => {
        if (!!props.itemTransform && props.itemTransform.style.position === "absolute") {
            loadCallback();
        }
    }, [props]);

    return (
        <>
            {React.createElement(Components[data.type], {
                style:props.style,
                data,
                loadCallback,
                key: data.id
            })}
        </>
    );
};

export default ItemData;