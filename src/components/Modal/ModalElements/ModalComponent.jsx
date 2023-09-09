import React from 'react';
import ModalButton from "./ModalButton";
import ModalUpload from "./ModalUpload";
import ModalInput from "./ModalInput";
import ModalTextarea from "./ModalTextarea";
import ModalSelect from "./ModalSelect";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "store/reducers/changeForm";

const Components = {
    'button': ModalButton,
    'upload': ModalUpload,
    'input': ModalInput,
    'textarea': ModalTextarea,
    'select': ModalSelect
}

const ModalComponent = ({componentType, id}) => {
    let TargetComponent = Components[componentType];
    const dispatch = useDispatch();
    const field = useSelector((state) => state.form[id]);

    function componentCallback(event) {
        dispatch(actions.changeField({id, value:event.target.value}));
    }

    return (
        <TargetComponent callback={componentCallback} data={field}/>
    );
};

export default ModalComponent;