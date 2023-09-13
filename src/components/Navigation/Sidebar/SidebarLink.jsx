import React from 'react';
import {darkenColor} from "scripts/utils/rgbmanip";
import styles from "styles/navigation/sidebar/Sidebar.scss";
import {useSelector} from "react-redux";

const linkColor = styles.linkColor;

const SidebarLink = ({link, text}) => {
    const location = useSelector((state) => state.location);
    const isCurrent = (location.relativeURL === link);

    return (
        <div className={"sidebar__link-wrapper"}>
            <a className={"sidebar__link " + (isCurrent ? 'sidebar__link--current' : '')} href={link}
               style={{
                   ...(!isCurrent ? {backgroundColor: darkenColor(linkColor, page.depth * 10 / 100)}: {}),
                   ...(sublist.length ? {marginLeft: "20px"} : {})
               }}>
                {text}
            </a>
            {haveSublist && <button ref={mounted} className="sidebar__link-btn" onClick={() => setListOpened(!listOpened)}></button>}
        </div>
    );
};

export default SidebarLink;