import React from 'react';
import 'styles/item/itemImage.scss';
import {changeModal} from "components/Modal/changeModal";
import {changeCarousel} from "components/Carousel/changeCarousel";

const ItemImage = ({data}) => {
    changeModal('carousel', {})
    return (
        <div className="item__image" onClick={() => changeCarousel("", data.id)}>
            <img src={data.img} alt="" className="item__data"/>
        </div>
    );
};

export default ItemImage;