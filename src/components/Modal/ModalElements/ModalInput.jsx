import React from 'react';
import 'styles/modal/modal-elements/ModalInput.scss';

const ModalInput = ({callback, data}) => {
    // attrs = Object.values(attrs).map(attr => {
    //     return {[attr]: attr};
    // });
    // console.log({...attrs})
    return (
        <input name={data.name}
               value={data.value}
               onChange={callback}
               className="modal-input"/>
    );
};

export default ModalInput;