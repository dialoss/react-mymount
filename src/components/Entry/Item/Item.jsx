import React from 'react';
import InfoBlock from "../Info/InfoBlock";
import 'styles/item/item.scss';
import ItemData from "./ItemData/ItemData";
import {useLayout} from "hooks/useLayout";

const EntryItem = ({item}) => {
    const ref = React.createRef();
    const dimensions = useLayout({width:item.media_width, height:item.media_height, changed:false}, ref);

    return (
        <div className={"item__wrapper "} ref={ref}
             style={dimensions.changed ? {
                 width:`${dimensions.width}px`,
                 height:`${dimensions.height}px`,
             } : {}}>

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