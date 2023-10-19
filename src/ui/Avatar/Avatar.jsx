import React from 'react';
import styles from "./Avatar.module.scss";

const Avatar = ({style, hover, ...props}) => {
    let src = props.src;
    return (
        <div className={"avatar " + styles.avatar + ' ' + (hover ? styles.hover : "")}>
            {!!src ?
                <img src={src} alt=""/> :
                <span className={styles.placeholder}></span>
            }
        </div>
    );
};

export default Avatar;