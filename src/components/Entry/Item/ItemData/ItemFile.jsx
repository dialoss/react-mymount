import React from 'react';

const ItemFile = ({data}) => {
    return (
        <div className="item-file">
            <div className="file__download">
                <a className="file__download-link" href={data.path} download target="_blank"></a>
                <span className={`file__download-image fiv-cla fiv-icon-${data.extension}`}></span>
            </div>
            <span className="file__title">{data.name}</span>
        </div>
    );
};

export default ItemFile;