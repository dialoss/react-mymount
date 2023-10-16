import React, {useRef} from 'react';
import "./ItemFile.scss";
import {preventOnTransformClick} from "ui/ObjectTransform/helpers";

const ItemFile = ({data}) => {
    const ref = useRef();
    return (
        <div className="item__file">
            <div className="file__download">
                <a className="file__download-link" href={data.url} ref={ref}
                   download
                   target="_blank"
                   onClick={(event) => {if (preventOnTransformClick(ref)) event.preventDefault()}}>
                </a>
                <span className={`file__download-image fiv-cla fiv-icon-${data.filename.split('.').slice(-1)[0]}`}></span>
            </div>
            <span className="file__title">{data.filename}</span>
        </div>
    );
};

export default ItemFile;