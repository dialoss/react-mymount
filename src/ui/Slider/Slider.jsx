import React, {cloneElement, useState} from 'react';
import "./Slider.scss";

const Slider = ({children, togglers}) => {
    const [isOpened, setOpened] = useState(true);

    const state = (isOpened ? "opened" : "closed");

    return (
        <div className={"slider " + state}>
            <div className={"slider__body"}>
                {children}
                <div className="slider__togglers">
                    {
                        togglers.map((toggler, index) => {
                            return cloneElement(toggler.element, {onClick: () => {
                                    toggler.callback();
                                    const action = toggler.action;
                                    setOpened(opened => {
                                        if (action === 'toggle') return !opened;
                                        return action === 'open';
                                    });
                                }, key: index});
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Slider;