import React, {useCallback, useEffect, useRef, useState} from 'react';
import './ItemImage.scss';
import {triggerEvent} from "helpers/events";

const ItemImage = ({data}) => {
    const ref = useRef();
    const carouselCallback = useCallback(() => {
        const itemTransform = ref.current.closest(".transform-item");
        if (!!itemTransform && Array.from(itemTransform.classList).slice(-1)[0] === 'transformed') {
            itemTransform.classList.remove("transformed");
            return;
        }
        triggerEvent('open-carousel', data.id);
    }, []);
    useEffect(()=>{
        const itemRef = ref.current;
        const container = itemRef.closest(".transform-container");
        const contWidth = container.getBoundingClientRect().width;
        const ratio = data.media_width / data.media_height;
        itemRef.style['aspect-ratio'] = ratio;
        const itemTransform = itemRef.closest(".transform-item");

        if (itemTransform.style.position !== "absolute") {
            if (data.row > 1) {
                itemTransform.style.width = 100 / data.row + "%";
            } else {
                if (itemRef.getBoundingClientRect().width === 0) {
                    itemTransform.style.width = Math.min(contWidth, data.media_width) / contWidth * 100 + "%";
                    // ref.current.style.width = data.media_width / contWidth * 100 + "%";
                }
                // ref.current.style.height = ratio * ref.current.getBoundingClientRect().width + "px";
            }
        } else {
            triggerEvent("init-container", container);
        }
    },[]);

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