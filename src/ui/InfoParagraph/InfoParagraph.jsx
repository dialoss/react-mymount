import React from 'react';

const InfoParagraph = React.forwardRef(function InfoParagraph({type, callback, ...props}, ref) {
    return (
            <p onClick={callback} ref={ref} {...props}
               className={`info__paragraph info__paragraph-${type}`}></p>
    );
});

export default InfoParagraph;