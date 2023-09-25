import React, {useCallback, useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
import InfoBlock from "ui/InfoBlock/InfoBlock";
import './Item.scss';
import ItemData from "./components/ItemData";
import ItemFile from "./components/File/ItemFile";
import {useThemes} from "hooks/useThemes";
import {ThemeContext} from "ui/Themes";
import {triggerEvent} from "../../../../helpers/events";

const EntryItem = ({item}) => {
    const theme = useContext(ThemeContext);
    // let contWidth = container.current.getBoundingClientRect().width;
    // const ratio = item.media_height / item.media_width;
    // let itemWidth = 0;
    // if (item.max_width !== "0") {
    //     itemWidth = +item.max_width * contWidth / 100;
    // } else {
    //     itemWidth = contWidth / row - 2 * +theme.listStyle.mypadding;
    // }
    // if (item.media_width !== 0) itemWidth = Math.min(itemWidth, item.media_width);
    // let dims = {width: itemWidth, height: itemWidth * ratio};
    // useEffect(() => {
    //     triggerEvent("init-container", container.current);
    // }, []);
    return (
        <div className={Object.values(theme).map(th => th.item__wrapper).join(' ')}>
            <div className={`item-${item.id} item item-${item.type}`} style={{
                ...(!item.show_shadow && {boxShadow: "none"}),
                // width: (dims.width === -1 ? "auto" : dims.width + "px")
            }}>
                <ItemData data={item}></ItemData>
                <InfoBlock data={item}></InfoBlock>
                {item.file && <ItemFile data={item.file_data}></ItemFile>}
            </div>
        </div>
    );
};

export default EntryItem;