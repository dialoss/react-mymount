import React from 'react';
import ItemFile from "./ItemFile";
import 'styles/item/itemImage.scss';

const ItemImage = ({data}) => {
    return (
        <div className="item__image">
            <img src={data.img} alt="" className="item__data"/>
            {data.file && <ItemFile data={data.file_data}></ItemFile>}
        </div>
    );
};

export default ItemImage;