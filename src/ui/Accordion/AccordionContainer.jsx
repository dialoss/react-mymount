import React, {useEffect, useRef, useState} from 'react';
import Accordion from "./Accordion";

const AccordionContainer = ({children, title}) => {
    const [opened, setOpened] = useState(false);

    const handleChange = () => {
        setOpened(opened => !opened);
    };

    const [height, setHeight] = useState(0);
    const ref = useRef();

    useEffect(() => {
        if (height.current && height.current !== 0) return;
        let child = ref.current.children[0];
        if (!child) return;
        const resizeObserver = new ResizeObserver(() => {
            setHeight(child.getBoundingClientRect().height);
        });
        resizeObserver.observe(child);
        return () => resizeObserver.disconnect();
    }, []);

    return (
        <Accordion toggle={handleChange} isOpened={opened} text={title} ref={ref} height={height}>
            {children}
        </Accordion>
    );
};

export default AccordionContainer;