import React from 'react';
import 'styles/item/itemImage.scss';
import {changeModal} from "components/Modal/changeModal";

const ItemImage = ({data}) => {
    return (
        <div className="item__image" onClick={() =>
            changeModal('carousel', {
                isOpened: true,
                currentImage: data.img,
                imageText:
            })}>
            <img src={data.img} alt="" className="item__data"/>
        </div>
    );
};

export default ItemImage;