import {useEffect, useState} from "react";

export const useLayout = (dims, ref) => {
    const [dimensions, setDimensions] = useState(dims);

    useEffect(() => {
        let curWidth = ref.current.getBoundingClientRect().width;
        let curHeight = curWidth * dimensions.height / dimensions.width;
        setDimensions({width:curWidth, height: curHeight, changed:true});
    }, []);
    return dimensions;
}