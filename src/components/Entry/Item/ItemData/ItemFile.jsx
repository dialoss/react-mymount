import React from 'react';

const ItemFile = ({path, extension, name}) => {
    return (
        <div className="item-file">
            <div className="file__download">
                <a className="file__download-link" href={path} download target="_blank"></a>
                <span className={`file__download-image fiv-cla fiv-icon-${extension}`}></span>
            </div>
            <span className="file__title">{name}</span>
        </div>
    );
};

export default ItemFile;