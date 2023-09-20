import React from 'react';

const MovableContainer = ({children}) => {
    return (
        <div className={"movable-container"}>
            {children}
        </div>
    );
};

export default MovableContainer;