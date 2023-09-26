import React, {useContext, useEffect, useRef, useState} from 'react';
import InfoBlock from "ui/InfoBlock/InfoBlock";
import './Item.scss';
import ItemData from "./components/ItemData";
import {ThemeContext} from "ui/Themes";
import {triggerEvent} from "helpers/events";

const EntryItem = ({item}) => {
    const theme = useContext(ThemeContext);
    const [itemData, setItemData] = useState(<></>);
    useEffect(() => {
        setItemData(<ItemData data={item}></ItemData>);
    }, []);
    const ref = useRef();
    useEffect(()=>{
        if (!(item.type === 'video' || item.type === 'image')) return;
        const itemRef = ref.current;
        const container = itemRef.closest(".transform-container");
        const contWidth = container.getBoundingClientRect().width;
        const ratio = item.media_width / item.media_height;
        itemRef.style['aspect-ratio'] = ratio;
        const itemTransform = itemRef.closest(".transform-item");

        if (itemTransform.style.position !== "absolute") {
            if (item.row > 1) {
                itemTransform.style.width = 100 / item.row + "%";
            } else {
                if (itemRef.getBoundingClientRect().width === 0 || !!itemTransform.style.width) {
                    itemTransform.style.width = Math.min(contWidth, item.media_width) / contWidth * 100 + "%";
                }
            }
        } else {
            triggerEvent("init-container", container);
        }
    },[]);
    return (
        <div className={Object.values(theme).map(th => th.item__wrapper).join(' ')}>
            <div className={`item-${item.id} item item-${item.type}`} ref={ref}
                 style={{...(!item.show_shadow && {boxShadow: "none"})}}>
                {itemData}
                <InfoBlock data={item}></InfoBlock>
            </div>
        </div>
    );
};

export default EntryItem;