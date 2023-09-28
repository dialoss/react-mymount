import React, {useCallback, useEffect, useRef} from 'react';
import './ItemImage.scss';
import {triggerEvent} from "helpers/events";
import {preventOnTransformClick} from "ui/ObjectTransform/helpers";

const ItemImage = ({data}) => {
    const ref = useRef();
    const carouselCallback = useCallback(() => {
        if (preventOnTransformClick(ref)) return;
        triggerEvent('carousel:open', data.id);
    }, []);

    return (
        <div className="item__image" ref={ref}>
            <img src={data.url} alt=""
                 className="item__data"
                 onClick={carouselCallback}
                 onDragStart={e => e.preventDefault()}/>
        </div>
    );
};

export default ItemImage;