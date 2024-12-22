import { PresentationType } from "../PresentationType"

export type SelectionType = {
    selectedSlideIds: string[]
    selectedObjectIds: string[]
}

export type ImageData = {
    id: string
    url: string
    alt: string
}

export type EditorType = {
    presentation: PresentationType
    selection: SelectionType
    colors: string[]
    searchedImages: ImageData[]
}