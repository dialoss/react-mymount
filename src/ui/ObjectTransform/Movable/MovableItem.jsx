import React from 'react';

const MovableItem = ({children}) => {
    return (
        <div className={"movable-item"}>
            {children}
        </div>
    );
};

export default MovableItem;