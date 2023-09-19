import React, {useContext} from 'react';
import {darkenColor} from "../rgbmanip";
import styles from "./SidebarLink.scss";
import {CurrentLocation} from "../../SidebarContainer";
import {useMyLocation} from "../../../../hooks/useMyLocation";

const linkColor = styles.linkColor;

const SidebarLink = ({link, children, depth, haveSublist, callback}) => {
    const isCurrent = useMyLocation().relativeURL === link;
    let style = {
    ...(!isCurrent ? {backgroundColor: darkenColor(linkColor, depth * 10 / 100)}: {}),
    ...(haveSublist ? {marginLeft: "20px"} : {})
    };
    return (
        <div className={"sidebar__link-wrapper"}>
            <a className={"sidebar__link " + (isCurrent ? 'sidebar__link--current' : '')}
               href={link}
               style={style}>{children}
            </a>
            {haveSublist && <button className="sidebar__link-btn" onClick={callback}></button>}
        </div>
    );
};

export default SidebarLink;