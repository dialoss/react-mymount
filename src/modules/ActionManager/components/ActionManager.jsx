import React from 'react';

const ActionManager = () => {
    function handleMenu(action) {
        handleAction(action);
        changeModal('context', {isOpened: false});
    }

    return (
        <>

        </>
    );
};

export default ActionManager;