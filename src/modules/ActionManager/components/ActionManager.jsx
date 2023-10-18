import React from 'react';
import EntryActions from "components/Modals/ContextMenu/components/EntryActions/EntryActions";
import {useAddEvent} from "hooks/useAddEvent";
import {setActionElement} from "./helpers";
import EditorManager from "components/EditorManager/EditorManager";
import ObjectTransform from "ui/ObjectTransform/ObjectTransform";
import {triggerEvent} from "helpers/events";
import CarouselContainer from "components/Modals/Carousel/CarouselContainer";
import {ActionForm} from "modules/ActionForm";
import {useUserAuth} from "hooks/useUserAuth";
import MessengerContainer from "../../../components/Messenger/MessengerContainer";
import Actions from "components/Modals/ContextMenu/components/EntryActions/actions";
import {useSelector} from "react-redux";
import {getOrCreateUser} from "../../../components/Messenger/api/firebase";
import {actions} from "../../User/store/reducers";

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
            {user.authenticated && <MessengerContainer user={user}></MessengerContainer>}
        </>
    );
};

export default ActionManager;