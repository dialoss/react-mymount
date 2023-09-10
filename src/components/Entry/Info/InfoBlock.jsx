import React from 'react';
import InfoParagraph from "./InfoParagraph";
import 'styles/entry/info.scss';

const InfoBlock = ({data}) => {
    const dateFormat = new Date(data.date);
    const formattedDate = dateFormat.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).split('/').reverse().join('-');
    return (
        <div className="info__block">
            <div className="info__block-inner">
                {data.title && <InfoParagraph type={'title'}>{data.title}</InfoParagraph>}
                <div className="info__block-section">
                    {data.date && data.show_date && <InfoParagraph type={'date'}>{formattedDate}</InfoParagraph>}
                    {data.description && <InfoParagraph type={'description'}>{data.description}</InfoParagraph>}
                </div>
                {data.filename && <InfoParagraph style={{display:"none"}} type={'filename'}>{data.filename}</InfoParagraph>}
            </div>
        </div>
    );
};

export default InfoBlock;