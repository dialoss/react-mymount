import React from 'react';

const ContextItem = ({callback, name}) => {
    return (
        <button className="context__button" onClick={callback}>{name}</button>
    );
};

export default ContextItem;