import React from 'react';
import EntryActions from "components/Modals/ContextMenu/components/EntryActions/EntryActions";
import {useAddEvent} from "hooks/useAddEvent";
import {setActionElement} from "./helpers";
import EditorManager from "components/EditorManager/EditorManager";
import ObjectTransform from "ui/ObjectTransform/ObjectTransform";
import CarouselContainer from "components/Modals/Carousel/CarouselContainer";
import {ActionForm} from "modules/ActionForm";
import MessengerContainer from "../../../components/Messenger/MessengerContainer";
import Actions from "components/Modals/ContextMenu/components/EntryActions/actions";
import {useSelector} from "react-redux";
import ActionButton from "../../../ui/Buttons/ActionButton/ActionButton";
import {triggerEvent} from "../../../helpers/events";

const ActionManager = () => {
    function initAction(event) {
        setActionElement(event.detail);
    }
    function actionCallback(event) {
        Actions.action(event.detail);
    }
    useAddEvent('action:init', initAction);
    useAddEvent('action:callback', actionCallback)

    const user = useSelector(state => state.user);

    return (
        <>
            {user.isAdmin &&
                <>
                    <EntryActions></EntryActions>
                    <EditorManager></EditorManager>
                </>
            }
            <ActionForm></ActionForm>
            <ObjectTransform></ObjectTransform>
            <CarouselContainer></CarouselContainer>
            {user.authenticated && <MessengerContainer user={user} appName={'mymount'}></MessengerContainer>}
            {<ActionButton onClick={() =>
                triggerEvent('messenger-window:toggle', {toggle: true})
            } style={{position:"fixed",right:40, bottom:20, backgroundColor:'#c73737', zIndex: 10}}>
                Связаться со мной</ActionButton>}
        </>
    );
};

export default ActionManager;