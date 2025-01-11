import { Gradient, Image, PresentationType, Solid } from "../PresentationType"

export type SelectionType = {
    selectedSlideIds: string[]
    selectedObjectIds: string[]
}

export type ImageData = {
    id: string
    url: string
    alt: string
}

export type Color = {

}

export type KeyCodeType = 'ctrl' | 'alt' | 'shift'

export type EditorType = {
    presentation: PresentationType
    selection: SelectionType
    colors: Array<Solid | Gradient>
    searchedImages: ImageData[]
    keys: Set<KeyCodeType>
}