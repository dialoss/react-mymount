import React from 'react';
import InfoParagraph from "ui/InfoParagraph/InfoParagraph";
import './InfoBlock.scss';
import ActionButton from "ui/Buttons/ActionButton/ActionButton.jsx";
import dayjs from "dayjs";
import {triggerEvent} from "helpers/events";

const InfoBlock = ({data}) => {
    const formattedDate = dayjs(data.date).format("hh:mm DD.MM.YYYY");
    return (
        <span className={"info__block"}>
            {!!data.title && <InfoParagraph type={'title'}
                                            style={!!data.description?{}:{paddingBottom:"8px"}}>
                                                {data.title}</InfoParagraph>}
            <span className="info__block-section">
                {!!data.date && data.show_date && <InfoParagraph type={'date'}>{formattedDate}</InfoParagraph>}
                {!!data.description && <InfoParagraph type={'description'}>{data.description}</InfoParagraph>}
            </span>
             <span className="info__block-section info__block-buy">
                 {!!data.price &&
                     <>
                         <InfoParagraph type={'price'}>{data.price}</InfoParagraph>
                         <ActionButton onClick={() => triggerEvent("form-data", {type:'buy'})}>
                             заказать изготовление
                         </ActionButton>
                     </>
                 }
            </span>

            {!!data.filename && <InfoParagraph style={{display:"none"}} type={'filename'}>{data.filename}</InfoParagraph>}
        </span>
    );
};

export default InfoBlock;