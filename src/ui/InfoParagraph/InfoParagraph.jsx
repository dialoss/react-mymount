import React from 'react';

const InfoParagraph = React.useRef(function InfoParagraph({type, callback, ref, ...props}) {
    return (
            <p onClick={callback} ref={ref} {...props}
               className={`info__paragraph info__paragraph-${type}`}></p>
    );
});

export default InfoParagraph;