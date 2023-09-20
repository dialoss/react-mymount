import React from 'react';
import './ItemImage.scss';

const ItemImage = ({data}) => {
    return (
        <div className="item__image">
            <img src={data.img} alt="" className="item__data"/>
        </div>
    );
};

export default ItemImage;