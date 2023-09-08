import React from 'react';

const InfoParagraph = ({type, children, ...props}) => {
    return (
        <p className={`info__paragraph info__paragraph-${type}`} {...props}>{children}</p>
    );
};

export default InfoParagraph;