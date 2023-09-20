import React, {useEffect, useRef} from 'react';
import "./InfoParagraph.scss";

const InfoParagraph = ({type, callback=()=>{}, children, ...props}) => {
    const ref = useRef();
    useEffect(() => {
        ref.current.innerHTML = children;
    }, [children])
    return (
            <p onClick={callback} ref={ref} {...props}
               className={`info__paragraph info__paragraph-${type}`}></p>
    );
};

export default InfoParagraph;