import React from 'react';
import ContextButton from "../Button/Button";
import './ContextMenu.scss';

const ContextMenu = ({actions, position}) => {
    return (
        <div className="context-menu" style={position}>
            {
                actions.map((action, index) =>
                    <ContextButton name={action} key={index}></ContextButton>
                )
            }
        </div>
    );
};

export default ContextMenu;