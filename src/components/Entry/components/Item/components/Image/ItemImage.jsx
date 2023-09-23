import React from 'react';
import './ItemImage.scss';

const ItemImage = ({data}) => {
    return (
        <div className="item__image">
            <img src={data.img} alt=""
                 className="item__data"
                 onDragStart={e => e.preventDefault()}/>
        </div>
    );
};

export default ItemImage;