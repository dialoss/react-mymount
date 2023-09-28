import React, {useCallback, useEffect, useRef} from 'react';
import './ItemImage.scss';
import {triggerEvent} from "helpers/events";
import {preventOnTransformClick} from "ui/ObjectTransform/helpers";

const ItemImage = ({data, ...props}) => {
    const ref = useRef();
    const carouselCallback = useCallback(() => {
        if (preventOnTransformClick(ref)) return;
        triggerEvent('carousel:open', data.id);
    }, []);

    return (
        <div className="item__image" ref={ref} {...props}>
            <img src={data.url} alt=""
                 onClick={carouselCallback}
                 onDragStart={e => e.preventDefault()}/>
        </div>
    );
};

export default ItemImage;