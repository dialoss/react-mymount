import React, {useCallback} from 'react';
import {triggerEvent} from "helpers/events";
import "./Button.scss";
import ContextMenu from "../ContextMenu/ContextMenu";

const ContextButton = ({action}) => {
    const callback = useCallback(() => {
        triggerEvent('context-window:button', action.callback);
    }, []);
    return (
        <div className={"context__item"}>
            <button className="context__button" onClick={callback}>{action.name}</button>
            <div className={"context__hover"}>
                {!!action.actions.length &&
                    <ContextMenu actions={action.actions}>
                    </ContextMenu>
                }
            </div>
        </div>
    );
};

export default ContextButton;