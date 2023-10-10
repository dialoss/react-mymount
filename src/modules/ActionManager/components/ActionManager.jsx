import React from 'react';
import EntryActions from "components/Modals/ContextMenu/components/EntryActions/EntryActions";
import {useAddEvent} from "hooks/useAddEvent";
import {actionElement, setActionElement} from "./helpers";
import EditorManager from "components/EditorManager/EditorManager";
import ObjectTransform from "ui/ObjectTransform/ObjectTransform";
import {triggerEvent} from "helpers/events";
import CarouselContainer from "components/Modals/Carousel/CarouselContainer";
import {ActionForm} from "modules/ActionForm";
import {useUserAuth} from "hooks/useUserAuth";
import MessengerContainer from "../../Messenger/MessengerContainer";

const ActionManager = () => {
    function initAction(event) {
        setActionElement(event.detail);
    }
    useAddEvent('action:init', initAction);

    function actionCallback(event) {
        const data = event.detail;
        if (!!actionElement) {
            data.entry_id ||= actionElement.entry.id;
            data.item_id ||= actionElement.item.id;
        }
        triggerEvent('entrylist:handle-changes', data);
    }

    useAddEvent('action:callback', actionCallback);

    const userAuth = useUserAuth();

    function openMessenger() {
        triggerEvent('messenger-window:toggle', {toggle: true});
    }

    return (
        <>
            {userAuth &&
                <>
                    <EntryActions></EntryActions>
                    <EditorManager></EditorManager>
                </>
            }
            <ActionForm></ActionForm>
            <ObjectTransform></ObjectTransform>
            <CarouselContainer></CarouselContainer>
            <MessengerContainer></MessengerContainer>
            <div onClick={openMessenger}
                    style={{position:"fixed",right:40,
                        bottom:20, zIndex:10,
                        width: 100, textAlign: "center",
                        fontSize: "14px", padding: "8px",
                        backgroundColor: "#fefefe", color:"#222", border:"2px solid grey"}}
            >Связаться со мной</div>
        </>
    );
};

export default ActionManager;