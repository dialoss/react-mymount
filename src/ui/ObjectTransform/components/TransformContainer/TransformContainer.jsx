import React from 'react';

const TransformContainer = ({children}) => {
    return (
        <div className={"transform-container"}>
            {children}
        </div>
    );
};

export default TransformContainer;