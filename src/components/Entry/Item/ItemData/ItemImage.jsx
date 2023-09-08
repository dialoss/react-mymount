import React from 'react';
import ItemFile from "./ItemFile";

const ItemImage = ({imageData}) => {
    return (
        <div className="item-image">
            <img src={imageData.img} alt="" className="item__data item__data-image item__image--carousel"/>
                <div className="item__image-size item__image-width" style={{display:"none"}}>{imageData.width}</div>
                <div className="item__image-size item__image-height" style={{display:"none"}}>{imageData.height}</div>
                {imageData.file && <ItemFile imageData.file_data></ItemFile>}
        </div>
    );
};

export default ItemImage;