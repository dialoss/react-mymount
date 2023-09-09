import React from 'react';
import InfoParagraph from "./InfoParagraph";

const InfoBlock = ({title="", description="", date="", filename=""}) => {
    const dateFormat = new Date(date);
    const formattedDate = dateFormat.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).split('/').reverse().join('-');
    return (
        <div className="info__block">
            <div className="info__block-inner">
                {title && <InfoParagraph type={'title'}>{title}</InfoParagraph>}
                <div className="info__block-section">
                    {date && <InfoParagraph type={'date'}>{formattedDate}</InfoParagraph>}
                    {description && <InfoParagraph type={'description'}>{description}</InfoParagraph>}
                </div>
                {filename && <InfoParagraph style={{display:"none"}} type={'filename'}>{filename}</InfoParagraph>}
            </div>
        </div>
    );
};

export default InfoBlock;