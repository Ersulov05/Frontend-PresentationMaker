import { EditorType } from "./editor";

const MAX_SCALE: number = 2;
const MIN_SCALE: number = 0.5;
const STEP_CHANGE_SCALE: number = 0.2;

function addScale(editor: EditorType): EditorType
{
    const scale = Math.round((editor.presentation.scale + STEP_CHANGE_SCALE) * 100) / 100
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            scale: Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale))
        }
    }
}

function subScale(editor: EditorType): EditorType
{
    const scale = Math.round((editor.presentation.scale - STEP_CHANGE_SCALE) * 100) / 100
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            scale: Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale))
        }
    }
}

function changeScale(editor: EditorType, newScale: number)
{
    const scale = Math.round((newScale) * 100) / 100
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            scale: Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale))
        }
    }
}

export {
    addScale,
    subScale,
    changeScale,
}