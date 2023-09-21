import React, { useEffect, useRef, useState} from 'react';
import EntryItem from "./components/Item/Item";
import InfoBlock from "ui/InfoBlock/InfoBlock";
import {Link} from "react-router-dom";
import {useThemes} from "hooks/useThemes";
import MovableContainer from "ui/ObjectTransform/Movable/MovableContainer";
import MovableItem from "../../ui/ObjectTransform/Movable/MovableItem";

const Entry = ({entry}) => {
    const theme = useThemes();
    const style = theme.listStyle;

    const ref = useRef();

    let mediaItems = 0;
    const [itemsClass, setClass] = useState("");
    useEffect(() => {
        if (mediaItems >= 3) setClass("entry__items--3");
        else if (mediaItems >= 2) setClass("entry__items--2");
        else if (mediaItems >= 1) setClass("entry__items--1");
    }, []);

    return (
        <div className={Object.values(theme).map(th => th.entry__wrapper).join(' ')}>
            <div className={`entry-${entry.id} entry ${style.entry} content__tab-${entry.tab_id}`}>
                {
                    entry.page_from.length > 1 &&
                    <Link className={style.entry__link} to={entry.page_from}></Link>
                }
                <MovableContainer>
                    <div className={style.entry__items + ' ' + style[itemsClass]} ref={ref}>
                        {
                            entry.items.map((item) => {
                                if (item.type === 'videos' || item.type === 'images') mediaItems += 1;
                                return <MovableItem key={item.id}>
                                            <EntryItem item={item} key={item.id} container={ref}></EntryItem>
                                        </MovableItem>
                            })
                        }
                    </div>
                </MovableContainer>

                <InfoBlock data={entry}></InfoBlock>
            </div>
        </div>
    );
};

export default Entry;