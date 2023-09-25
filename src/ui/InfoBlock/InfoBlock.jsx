import React from 'react';
import InfoParagraph from "ui/InfoParagraph/InfoParagraph";
import './InfoBlock.scss';
import dayjs from "dayjs";

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
            {!!data.price && <InfoParagraph type={'price'}>{data.price}</InfoParagraph>}
            {!!data.filename && <InfoParagraph style={{display:"none"}} type={'filename'}>{data.filename}</InfoParagraph>}
        </span>
    );
};

export default InfoBlock;