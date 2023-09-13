import {useEffect, useLayoutEffect, useState} from "react";

export const useLayout = (dims, ref) => {
    const [height, setHeight] = useState(0);

    useEffect(() => {
        let curWidth = ref.current.getBoundingClientRect().width;
        let curHeight = curWidth * dims.height / dims.width;
        setHeight(curHeight);
    }, []);
    return [height, setHeight];
}