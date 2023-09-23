import store from "store";
import {useEffect, useMemo} from "react";

export function useThemes() {
    const allThemes = store.getState().themes.themes;
    return useMemo(() => {
        const activeThemes = {};
        Object.keys(allThemes).forEach(theme => {
            if (allThemes[theme].active) activeThemes[theme] = allThemes[theme].style;
        });
        console.log(11)
        return activeThemes;
    }, [allThemes]);
}