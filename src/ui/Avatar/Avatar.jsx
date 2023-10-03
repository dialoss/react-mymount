import React from 'react';
import styles from "./Avatar.module.scss";

const Avatar = ({style, hover, ...props}) => {
    return (
        <div className={"avatar " + styles.avatar + ' ' + (hover ? styles.hover : "")}
             style={style}>
            {Object.values(props).length ?
                <img {...props} alt=""/> :
                <div className={styles.placeholder}></div>
            }
        </div>
    );
};

export default Avatar;