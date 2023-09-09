import React from 'react';
import ItemFile from "./ItemFile";
import 'styles/item/itemImage.scss';

const ItemImage = ({data}) => {
    return (
        <div className="item__image">
            <img src={data.img} alt="" className="item__data"/>
                <div className="item__image-size item__image-width" style={{display:"none"}}>{data.media_width}</div>
                <div className="item__image-size item__image-height" style={{display:"none"}}>{data.media_height}</div>
                {data.file && <ItemFile data={data.file_data}></ItemFile>}
        </div>
    );
};

export default ItemImage;