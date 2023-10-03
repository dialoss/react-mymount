import React, {useState} from 'react';

const Slider = ({children}) => {
    const [isOpened, setOpened] = useState(true);

    return (
        <div className={"slider"}>
            {children}
        </div>
    );
};

export default Slider;