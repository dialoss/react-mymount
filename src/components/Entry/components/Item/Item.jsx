import React, {useContext, useEffect, useState} from 'react';
import InfoBlock from "ui/InfoBlock/InfoBlock";
import './Item.scss';
import ItemData from "./components/ItemData";
import ItemFile from "./components/File/ItemFile";
import {ThemeContext} from "ui/Themes";

const EntryItem = ({item}) => {
    const theme = useContext(ThemeContext);
    const [itemData, setItemData] = useState(<></>);
    useEffect(() => {
        setItemData(<ItemData data={item}></ItemData>);
    }, []);
    return (
        <div className={Object.values(theme).map(th => th.item__wrapper).join(' ')}>
            <div className={`item-${item.id} item item-${item.type}`}
                 style={{...(!item.show_shadow && {boxShadow: "none"})}}>
                {itemData}
                <InfoBlock data={item}></InfoBlock>
                {item.file && <ItemFile data={item.file_data}></ItemFile>}
            </div>
        </div>
    );
};

export default EntryItem;