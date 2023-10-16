import React, {useContext, useEffect, useRef, useState} from 'react';
import EntryItem from "./components/Item/Item";
import InfoBlock from "ui/InfoBlock/InfoBlock";
import {Link} from "react-router-dom";
import TransformContainer from "ui/ObjectTransform/components/TransformContainer/TransformContainer";
import TransformItem from "ui/ObjectTransform/components/TransformItem/TransformItem";
import {ActiveThemes} from "ui/Themes/index";
import "./Entry.scss";

const Entry = ({entry, ...props}) => {
    const theme = useContext(ActiveThemes);
    const style = theme.listStyle;

    let mediaItems = 0;
    let itemsRow = 1;
    entry.items.forEach(item => {
        if (['video', 'image', 'model'].includes(item.type)) mediaItems += 1;
    })
    if (mediaItems >= 3) itemsRow = 3;
    else if (mediaItems >= 2) itemsRow = 2;

    const [items, setItems] = useState([]);
    useEffect(() => {
        setItems(entry.items.map((item) => {
            if (!!item.price) return;
            item = {...item, row:itemsRow};
            return <TransformItem key={item.id}>
                <EntryItem item={item} key={item.id}></EntryItem>
            </TransformItem>
        }));
    }, [entry.items]);
    return (
        <div className={Object.values(theme).map(th => th.entry__wrapper).join(' ')} {...props}>
            {style &&
                <div className={`entry-${entry.id} entry ${style.entry}`}>
                    {
                        !!entry.page_from &&
                        <Link className={style.entry__link} to={'/' + entry.page_from.path}></Link>
                    }
                    <TransformContainer width={entry.container_width}>
                        <div className={style.entry__items} style={{width: "100%"}}>
                            {items}
                        </div>
                    </TransformContainer>

                    <InfoBlock data={entry}></InfoBlock>
                </div>
            }
        </div>
    );
};

export default Entry;