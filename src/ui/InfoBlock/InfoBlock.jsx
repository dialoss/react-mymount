import React from 'react';
import InfoParagraph from "ui/InfoParagraph/InfoParagraph";
import './InfoBlock.scss';
import dayjs from "dayjs";

const InfoBlock = ({data}) => {
    const formattedDate = dayjs(data.date).format("hh:mm DD.MM.YYYY");
    return (
        <div className={"info__block"}>
            {data.title && <InfoParagraph type={'title'}>{data.title}</InfoParagraph>}
            <div className="info__block-section">
                {data.date && data.show_date && <InfoParagraph type={'date'}>{formattedDate}</InfoParagraph>}
                {data.description && <InfoParagraph type={'description'}>{data.description}</InfoParagraph>}
            </div>
            {data.price && <InfoParagraph type={'price'}>{data.price}</InfoParagraph>}
            {data.filename && <InfoParagraph style={{display:"none"}} type={'filename'}>{data.filename}</InfoParagraph>}
        </div>
    );
};

export default InfoBlock;