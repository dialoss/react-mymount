import React from 'react';
import styles from "./Avatar.module.scss";

const Avatar = ({style, hover, ...props}) => {
    let src = props.src;
    return (
        <div className={"avatar " + styles.avatar + ' ' + (hover ? styles.hover : "")}
             style={style}>
            {!!src ?
                <img src={src} alt=""/> :
                <div className={styles.placeholder}></div>
            }
        </div>
    );
};

export default Avatar;