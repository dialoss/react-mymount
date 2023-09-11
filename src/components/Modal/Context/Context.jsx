import React from 'react';
import ContextItem from "./ContextItem";
import {ContextActions} from "./ContextActions";

const ContextMenu = () => {
    return (
        <div className={"context-menu"}>
            <div className="context__window">
                {
                    ContextActions.map(action =>
                        <ContextItem callback={action.callback}>{action.name}</ContextItem>
                    )
                }
            </div>
        </div>
    );
};

export default ContextMenu;