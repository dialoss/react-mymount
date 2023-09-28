import React, {useContext, useEffect, useRef, useState} from 'react';
import InfoBlock from "ui/InfoBlock/InfoBlock";
import './Item.scss';
import ItemData from "./components/ItemData";
import {triggerEvent} from "helpers/events";

const EntryItem = ({item}) => {
    const ref = useRef();
    const [itemData, setItemData] = useState(<></>);
    useEffect(() => {
        setItemData(<ItemData data={item}></ItemData>);

        const itemRef = ref.current;
        const itemTransform = itemRef.closest(".transform-item");
        const container = itemRef.closest(".transform-container");

        if (item.type === 'video' || item.type === 'image') {
            const contWidth = container.getBoundingClientRect().width;
            itemRef.style['aspect-ratio'] = item.media_width / item.media_height;

            if (itemTransform.style.position !== "absolute") {
                if (item.row > 1) {
                    itemTransform.style.width = 100 / item.row + "%";
                } else {
                    if (itemRef.getBoundingClientRect().width === 0 || !!itemTransform.style.width) {
                        itemTransform.style.width = Math.min(contWidth, item.media_width) / contWidth * 100 + "%";
                    }
                }
            }
        }
        if (itemTransform.style.position === "absolute") {
            triggerEvent("container:init", container);
        }
    }, []);
    return (
        <div className={"item__wrapper"}>
            <div className={`item-${item.id} item item-${item.type}`} ref={ref}
                 style={{...(!item.show_shadow && {boxShadow: "none"})}}>
                {itemData}
                {item.type !== 'textfield' && <InfoBlock data={item}></InfoBlock>}
            </div>
        </div>
    );
};

export default EntryItem;