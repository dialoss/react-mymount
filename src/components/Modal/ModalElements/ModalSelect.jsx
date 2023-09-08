import React from 'react';
import ModalOption from "./ModalOption";

const ModalSelect = ({value}) => {
    return (
        <select className="modal-select" autoComplete="off">
            {
                value.map((option, index) => {
                    return <ModalOption value={option.value} text={option} key={index}></ModalOption>
                })
            }
        </select>
    );
};

export default ModalSelect;