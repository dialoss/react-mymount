import React from 'react';
import ContextItem from "./ContextItem";
import {ContextActions} from "./ContextActions";
import 'styles/modal/context/Context.scss';

const ContextMenu = () => {
    function handleMenu(action) {
        action.callback();
    }
    return (
        <div className="context__content">
            {
                ContextActions.map((action, index) =>
                    <ContextItem callback={() => handleMenu(action)} name={action.name} key={index}></ContextItem>
                )
            }
        </div>
    );
};

export default ContextMenu;