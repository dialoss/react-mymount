import React from 'react';
import './ItemImage.scss';

const ItemImage = ({data, callback}) => {
    changeModal('carousel', {})
    return (
        <div className="item__image" onClick={() => changeCarousel("", data.id)}>
            <img src={data.img} alt="" className="item__data"/>
        </div>
    );
};

export default ItemImage;