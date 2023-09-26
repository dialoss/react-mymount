import React, {useEffect, useState} from 'react';
import {Quill} from "react-quill";
import InfoParagraph from "ui/InfoParagraph/InfoParagraph";

const ItemTextfield = ({data}) => {
    return (
        <div className={"item__textfields"}>
            <InfoParagraph type={"textfield"}>{data.text_transformed}</InfoParagraph>
        </div>
    );
};

export default ItemTextfield;