import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import InfoBlock from "ui/InfoBlock/InfoBlock";
import './Item.scss';
import ItemData from "./components/ItemData";
import ItemFile from "./components/File/ItemFile";
import {useThemes} from "hooks/useThemes";
import {triggerEvent} from "helpers/events";

const EntryItem = ({item, container}) => {
    const theme = useThemes();
    const [height, setHeight] = useState(-1);
    const ref = useRef();

    const style = useThemes().listStyle;

    useEffect(() => {
        if (+style.masonry !== 1) {
            let curWidth = container.current.getBoundingClientRect().width;
            let curHeight = curWidth * item.media_height / item.media_width;
            if (['images', 'video'].includes(item.type)) setHeight(item.media_height + 10);
            setHeight(curHeight);
        }
    }, []);

    const carouselCallback = useCallback(() => {
        if (item.type !== "images") return;
        const itemTransform = ref.current.closest(".transform-item");
        if (!!itemTransform && Array.from(itemTransform.classList).slice(-1)[0] === 'transformed') {
            itemTransform.classList.remove("transformed");
            return;
        }
        triggerEvent('open-carousel', item.id);
    }, []);

    return (
        <div className={Object.values(theme).map(th => th.item__wrapper).join(' ')}
             style={{height: (height === -1 ? "auto" : height + "px")}}
             ref={ref}
             onClick={carouselCallback}>
            <div className={`item-${item.id} item item-${item.type}`} style={{
                ...(!item.show_shadow && {boxShadow: "none"})
            }}>
                <ItemData data={item}></ItemData>
                <InfoBlock data={item}></InfoBlock>
                {item.file && <ItemFile data={item.file_data}></ItemFile>}
            </div>
        </div>
    );
};

export default EntryItem;