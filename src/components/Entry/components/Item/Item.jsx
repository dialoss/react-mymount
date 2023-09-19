import React, {useContext, useEffect, useRef, useState} from 'react';
import InfoBlock from "../Info/InfoBlockContainer";
import 'styles/item/item.scss';
import ItemData from "./ItemData/ItemData";
import {ThemeContext} from "../../Pages/ListView";
import ItemFile from "./ItemData/ItemFile";

const EntryItem = ({item, container}) => {
    const listStyle = useContext(ThemeContext);
    const [height, setHeight] = useState(0);
    // const [height, setHeight] = useLayout({width:item.media_width, height:item.media_height}, container);
    const mounted = useRef(null);
    useEffect(() => {
        let curWidth = container.current.getBoundingClientRect().width;
        let curHeight = curWidth * item.media_height / item.media_width;
        setHeight(curHeight);
    });

    return (
        <div className={listStyle.item__wrapper} style={{height: (height === -1 ? "auto" : height + "px")}}>
            <div className={`item-${item.id} item item-${item.type}`} style={{
                ...(!item.show_shadow && {boxShadow: "none"})
            }}>
                <ItemData data={item}></ItemData>
                <InfoBlock data={item}></InfoBlock>
                {item.file && <ItemFile data={item.file_data}></ItemFile>}
            </div>
            <div className="item__transform item__resize item__resize--right"></div>
            <div className="item__transform item__resize item__resize--left"></div>
        </div>
    );
};

export default EntryItem;