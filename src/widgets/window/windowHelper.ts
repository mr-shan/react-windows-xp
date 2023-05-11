import { WINDOW_STATES } from "@/constants/windowStates";

export const getDimensionObject = (width, height, left, top, zIndex, dim) => {
    if (!dim) dim = {
        width: width || '720px',
        height: height || '512px',
        left: left || "100px",
        top: top || "100px",
        zIndex: zIndex || 1,
    };
    return dim;
}

export const getWindowState = (oldState) => {
    const newState =
    oldState === WINDOW_STATES.NORMAL
        ? WINDOW_STATES.MAXIMIZED
        : WINDOW_STATES.NORMAL;
    return newState
}