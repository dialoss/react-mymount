import store from "store";
import {useEffect, useMemo, useRef, useState} from "react";

export function useThemes(defaultTheme) {
    const [activeThemes, setActive] = useState(defaultTheme);
    const allThemes = store.getState().themes.themes;
    useEffect(() => {
        let addThemes = {};
        Object.keys(allThemes).forEach(theme => {
            if (allThemes[theme].active) {
                addThemes[theme] = allThemes[theme].style;
            }
        });
        setActive(activeThemes => {return {...activeThemes, ...addThemes}});
    }, [allThemes]);

    return activeThemes;
}