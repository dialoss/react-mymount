import store from "store";

export function useThemes() {
    const themes = store.getState().themes.themes;
    return themes;
}