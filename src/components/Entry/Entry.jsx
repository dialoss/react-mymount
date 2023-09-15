import React, {useContext, useEffect, useState} from 'react';
import EntryItem from "./Item/Item";
import InfoBlock from "./Info/InfoBlock";
import {Link} from "react-router-dom";
import {ThemeContext} from "components/Pages/ListView";

const Entry = ({entry}) => {
    const listStyle = useContext(ThemeContext);
    const ref = React.createRef();
    let mediaItems = 0;
    const [itemsClass, setClass] = useState("");
    useEffect(() => {
        if (mediaItems >= 3) setClass("entry__items--3");
        else if (mediaItems >= 2) setClass("entry__items--2");
        else if (mediaItems >= 1) setClass("entry__items--1");
    }, []);
    return (
        <div className={listStyle.entry__wrapper}>
            <div className={`entry-${entry.id} entry ${listStyle.entry} content__tab-${entry.tab_id}`}>
                {entry.page_from.length > 1 && <Link className={listStyle.entry__link} to={entry.page_from}></Link>}
                <div className={listStyle.entry__items + ' ' + listStyle[itemsClass]} ref={ref}>
                    {
                        entry.items.map((item) => {
                            if (item.type === 'videos' || item.type === 'images') mediaItems += 1;
                            return <EntryItem item={item} key={item.id} container={ref}></EntryItem>
                        })
                    }
                </div>
                <InfoBlock data={entry}></InfoBlock>

            </div>
        </div>
    );
};

export default Entry;