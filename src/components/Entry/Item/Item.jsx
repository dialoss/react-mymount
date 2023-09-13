import React, {useContext, useEffect, useRef, useState} from 'react';
import InfoBlock from "../Info/InfoBlock";
import 'styles/item/item.scss';
import ItemData from "./ItemData/ItemData";
import {ThemeContext} from "../../Pages/ListView";

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
        {/* <div className={listStyle.item__wrapper} >*/}
            <div className={`item-${item.id} item item-${item.type}`}>
                <ItemData data={item}></ItemData>
                <InfoBlock data={{
                    title:item.media_title,
                    filename:item.filename,
                    description:item.media_description,
                }}></InfoBlock>
            </div>
            <div className="item__transform item__resize item__resize--right"></div>
            <div className="item__transform item__resize item__resize--left"></div>
        </div>
    );
};

export default EntryItem;