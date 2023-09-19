import React, {useEffect, useState} from 'react';
import SidebarList from "../List/SidebarList";
import SidebarLink from "../Link/SidebarLink";
import {useMyLocation} from "../../../../hooks/useMyLocation";

const SidebarItem = ({listItem}) => {
    const haveSublist = !!listItem.sublist.length;
    const [isOpened, setOpened] = useState(false);
    const location = useMyLocation().relativeURL;

    useEffect(() => {
        if (location === listItem.link) setOpened(true);
    }, []);

    return (
        <div className="sidebar__item">
            <SidebarLink link={listItem.link}
                         haveSublist={haveSublist}
                         depth={listItem.depth}
                         callback={() => setOpened(!isOpened)}>
                {listItem.text}
            </SidebarLink>

            {haveSublist &&
                <SidebarList list={listItem} isOpened={isOpened}>
                </SidebarList>
            }
        </div>
    );
};

export default SidebarItem;