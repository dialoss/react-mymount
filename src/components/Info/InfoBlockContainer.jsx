import React, {useContext} from 'react';
import InfoParagraphContainer from "./InfoParagraphContainer";
import 'styles/entry/info.scss';
import dayjs from "dayjs";

const InfoBlockContainer = ({data, theme}) => {
    const listStyle = theme.listStyle;
    const formattedDate = dayjs(data.date).format("hh:mm DD.MM.YYYY");
    return (
        <div className={"info__block"}>
            {data.title && <InfoParagraphContainer type={'title'}>{data.title}</InfoParagraphContainer>}
            <div className="info__block-section">
                {data.date && data.show_date && <InfoParagraphContainer type={'date'}>{formattedDate}</InfoParagraphContainer>}
                {data.description && <InfoParagraphContainer type={'description'}>{data.description}</InfoParagraphContainer>}
            </div>
            {data.price && <InfoParagraphContainer type={'price'}>{data.price}</InfoParagraphContainer>}
            {data.filename && <InfoParagraphContainer style={{display:"none"}} type={'filename'}>{data.filename}</InfoParagraphContainer>}
        </div>
    );
};

export default InfoBlockContainer;