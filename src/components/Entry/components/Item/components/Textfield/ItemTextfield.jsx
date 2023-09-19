import React, {useEffect, useState} from 'react';
import {Quill} from "react-quill";
import InfoParagraph from "ui/InfoParagraph/InfoParagraph";

const ItemTextfield = ({data}) => {
    const [value, setValue] = useState('');
    useEffect(() => {
        let tempContent = document.createElement("div");
        let dataJson = JSON.parse(data.text_transformed).ops;
        (new Quill(tempContent)).setContents(dataJson);
        let htmlText = tempContent.querySelector(".ql-editor").innerHTML;
        tempContent.remove();
        setValue(htmlText);
    }, []);
    return (
        <div className={"item__textfields"} onClick={()=>console.log("22")}>
            <InfoParagraph type={"textfield"}>{value}</InfoParagraph>
        </div>
    );
};

export default ItemTextfield;