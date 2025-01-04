import { ObjectType, PresentationType, SlideType } from "../store/PresentationType"
import { EditorType, KeyCodeType } from "../store/redux/EditorType"

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

    const { uid, background, objects } = data

    if (
        typeof uid !== 'string' ||
        !['solid', 'image'].includes(background.type) ||
        !Array.isArray(objects)
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

const validatePresentationData = (presentation: any): presentation is PresentationType => {
    if (typeof presentation !== 'object' || presentation === null) {
        return false
    }

    if (
        typeof presentation.name !== 'string' ||
        typeof presentation.scale !== 'number' ||
        !Array.isArray(presentation.slides)
    )

    for (const slide of presentation.slides) {
        if (!validateSlideData(slide)) {
            return false
        }
    }

    return true
}

const validateEditorData = (data: any): data is EditorType => {
    if (typeof data !== 'object' || data === null) return false

    const { presentation, selection, colors, searchedImages} = data
    let { keys } = data

    if (!Array.isArray(keys) && !(keys instanceof Set)) {
        return false
    }

    if (Array.isArray(keys)) {
        keys = new Set<KeyCodeType>(keys)
    }

    if (
        typeof selection !== 'object' ||
        selection === null ||
        !Array.isArray(selection.selectedSlideIds) ||
        !Array.isArray(selection.selectedObjectIds)
    ) {
        return false
    }

    if (!validatePresentationData(presentation)) {
        return false
    }

    if (!selection.selectedSlideIds.every((selectedSlideId: string) => typeof selectedSlideId === 'string') ||
        !selection.selectedObjectIds.every((selectedObjectId: string) => typeof selectedObjectId === 'string')
    ) {
        return false
    }

    if (!Array.isArray(searchedImages) ||
        !searchedImages.every(image => 
            typeof image === 'object' && 
            typeof image.id === 'string' && 
            typeof image.url === 'string' &&
            typeof image.alt === 'string'
        )
    ) {
        return false
    }

    if (!Array.isArray(colors) || !colors.every(color => typeof color === 'string')) {
        return false
    }

    if (!(keys instanceof Set) || !Array.from(keys).every(key => isValidKeyCode(key))) {
        console.log('/---/')
        return false;
    }

    return true
}

const isValidKeyCode = (key: unknown): key is KeyCodeType => {
    return key === 'ctrl' || key === 'alt' || key === 'shift';
}


export {
    validateEditorData,
    validateSlideData,
    validateObjectData,
    validatePresentationData
}