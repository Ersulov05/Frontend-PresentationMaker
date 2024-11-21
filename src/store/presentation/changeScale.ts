const MAX_SCALE: number = 2;
const MIN_SCALE: number = 0.5;
const STEP_CHANGE_SCALE: number = 0.2;

function addScale(currentScale: number): number
{
    const scale = Math.round((currentScale + STEP_CHANGE_SCALE) * 100) / 100
    return Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale))
}

function subScale(currentScale: number): number
{
    const scale = Math.round((currentScale - STEP_CHANGE_SCALE) * 100) / 100
    return Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale))
}

function changeScale(newScale: number)
{
    const scale = Math.round((newScale) * 100) / 100
    return Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale))
}

export {
    addScale,
    subScale,
    changeScale,
}