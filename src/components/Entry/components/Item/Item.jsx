import React, {useContext, useEffect, useRef, useState} from 'react';
import InfoBlock from "ui/InfoBlock/InfoBlock";
import './Item.scss';
import ItemData from "./components/ItemData";
import {ActiveThemes} from "ui/Themes/index";

const EntryItem = ({item}) => {
    const theme = useContext(ActiveThemes);
    const ref = useRef();
    const [itemProps, setItemProps] = useState({style: {}});
    useEffect(() => {
        const itemRef = ref.current;
        const itemTransform = itemRef.closest(".transform-item");
        const container = itemRef.closest(".transform-container");
        let style = {};
        if (['video', 'image', 'model'].includes(item.type)) {
            const contWidth = container.getBoundingClientRect().width;
            style['aspectRatio'] = item.media_width / item.media_height || '';

            if (itemTransform.style.position !== "absolute" && itemTransform.style.width === 'auto') {
                if (item.row > 1) {
                    itemTransform.style.width = 100 / item.row + "%";
                } else {
                    if (itemRef.getBoundingClientRect().width === 0 || !!itemTransform.style.width) {
                        itemTransform.style.width = Math.min(contWidth, item.media_width || contWidth) / contWidth * 100 + "%";
                    }
                }
            }
        }
        setItemProps({style, itemTransform, container});
    }, []);
    return (
        <div className={Object.values(theme).map(th => th.item__wrapper).join(' ')}>
            <div className={`item-${item.id} item item-${item.type}`} ref={ref}
                 style={{...(!item.show_shadow && {boxShadow: "none"})}}>
                <ItemData data={item} props={itemProps}></ItemData>
                {item.type !== 'textfield' && <InfoBlock data={item}></InfoBlock>}
            </div>
        </div>
    );
};

export default EntryItem;