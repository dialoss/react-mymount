import React, {createContext, useContext, useLayoutEffect, useRef, useState} from 'react';
import InfoBlock from "ui/InfoBlock/InfoBlock";
import './Item.scss';
import ItemData from "./components/ItemData";
import ItemFile from "./components/File/ItemFile";
import {useThemes} from "hooks/useThemes";
import {triggerEvent} from "helpers/events";
// import ItemTransform from "./ItemTransform";
// import "./ItemTransform.scss";

export const TransformContext = createContext({});

const EntryItem = ({item, container}) => {
    const theme = useThemes();
    const [height, setHeight] = useState(-1);
    const ref = useRef();
    const testr = useRef();
    const test2 = useRef();

    useLayoutEffect(() => {
        // let curWidth = container.current.getBoundingClientRect().width;
        // let curHeight = curWidth * item.media_height / item.media_width;
        // if (['images', 'video'].includes(item.type)) setHeight(item.media_height + 10);
        // setHeight(curHeight);
    }, []);

    return (
        <TransformContext.Provider value={{container:container, item:ref}}>
        {/*<ItemTransform type={"move"}>*/}
            <div className={Object.values(theme).map(th => th.item__wrapper).join(' ')}
                style={{height: (height === -1 ? "auto" : height + "px")}}
                 ref={ref}
                 onClick={() => {
                     if (item.type !== "images") return;
                     if (Array.from(ref.current.classList).slice(-1)[0] === 'moved') {
                         ref.current.classList.remove("moved");
                         return;
                     }
                     triggerEvent('open-carousel', item.id);
                 }}>
                <div className={`item-${item.id} item item-${item.type}`} style={{
                    ...(!item.show_shadow && {boxShadow: "none"})
                }}>
                    <ItemData data={item}></ItemData>
                    <InfoBlock data={item}></InfoBlock>
                    {item.file && <ItemFile data={item.file_data}></ItemFile>}
                    {/*<ItemTransform type={"resize--left"}><div className={"item__resize--left"} ref={testr}>*/}
                    {/*</div></ItemTransform>*/}
                    {/*<ItemTransform type={"resize--right"}><div className={"item__resize--right"} ref={test2}>*/}
                    {/*</div></ItemTransform>*/}
                </div>
            </div>
        {/*</ItemTransform>*/}
        </TransformContext.Provider>
    );
};

export default EntryItem;