import { EditorType } from "../store/editor"
import { ObjectType, SlideType } from "../store/PresentationType"

const validateObjectData = (data: any): data is ObjectType => {
    if (typeof data !== 'object' || data === null) return false

    const { uid, pos, size, type } = data

    if (
        typeof uid !== 'string' ||
        typeof pos !== 'object' || pos === null ||
        typeof size !== 'object' || size === null ||
        !['image', 'text'].includes(type)
    ) {
        return false
    }

    if (type === 'image') {
        const { src } = data
        return typeof src === 'string'
    } else if (type === 'text') {
        const { value, font, color, backgroundColor } = data
        return (
            typeof value === 'string' &&
            typeof font === 'object' && font !== null &&
            typeof color === 'string' &&
            typeof backgroundColor === 'string'
        )
    }

    return false
}

const validateSlideData = (data: any): data is SlideType => {
    if (typeof data !== 'object' || data === null) return false

    const { uid, background, objects, selectedObjectIds } = data

    if (
        typeof uid !== 'string' ||
        !['solid', 'image'].includes(background.type) ||
        !Array.isArray(objects) ||
        !Array.isArray(selectedObjectIds)
    ) {
        return false
    }

    for (const object of objects) {
        if (!validateObjectData(object)) {
            return false
        }
    }

    return true
}

const validateEditorData = (data: any): data is EditorType => {
    if (typeof data !== 'object' || data === null) return false

    const { presentation, colors } = data

    if (
        typeof presentation !== 'object' ||
        presentation === null ||
        typeof presentation.name !== 'string' ||
        !Array.isArray(presentation.slides) ||
        !Array.isArray(presentation.selectedSlideIds) ||
        typeof presentation.scale !== 'number'
    ) {
        return false
    }

    for (const slide of presentation.slides) {
        validateSlideData(slide)
    }

    if (!Array.isArray(colors) || !colors.every(color => typeof color === 'string')) {
        return false
    }

    return true
}

export {
    validateEditorData,
    validateSlideData,
    validateObjectData
}