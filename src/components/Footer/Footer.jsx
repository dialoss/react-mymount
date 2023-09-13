import React from 'react';
import 'styles/pages/footer.scss';
import {useSelector} from "react-redux";

const Footer = () => {
    const views = useSelector(state => state.location.views);
    return (
        <footer className="footer">
            <div className="footer__wrapper">
                <div className="container">
                    <div className="footer__inner">
                        <div className="footer__info">
                            <p className="footer__text footer__text--accent">
                                Фоменко Андрей
                            </p>
                            <p className="footer__text">
                                Home Mount Making
                            </p>
                            <p className="footer__text">
                                fomenko75@mail.ru
                            </p>
                        </div>
                        <div className="footer__info">
                            <div className="footer__counter">
                                <p className="footer__text">
                                    {views.totalViews}
                                </p>
                                <p className="footer__text">
                                    {views.curViews}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;