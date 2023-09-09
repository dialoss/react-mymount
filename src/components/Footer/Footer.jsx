import React from 'react';
import 'styles/pages/footer.scss';

const Footer = ({totalViews, curViews}) => {
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
                                    {totalViews}
                                </p>
                                <p className="footer__text">
                                    {curViews}
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