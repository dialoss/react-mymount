import React from 'react';
import ModalOption from "./ModalOption";

const ModalSelect = ({options}) => {
    return (
        <select className="modal-select" autoComplete="off">
            {
                options.map((option, index) => {
                    return <ModalOption value={option[0]} text={option[1]} key={index}></ModalOption>
                })
            }
        </select>
    );
};

export default ModalSelect;