import React from 'react';
import ContextButton from "../Button/Button";
import './ContextMenu.scss';

const ContextMenu = ({actions, position}) => {
    return (
        <div className="context-menu">
            {
                actions.map((action, index) =>
                    <ContextButton action={action} key={index}></ContextButton>
                )
            }
        </div>
    );
};

export default ContextMenu;