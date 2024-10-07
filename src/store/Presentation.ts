export type Position = {
    x: number
    y: number
}

export type Size = {
    width: number
    height: number
}

export type Solid = {
    color: string
    type: "solid"
}

export type Image = {
    src: string
    type: "image"
}

export type ObjectSlide = {
    uid: string
    pos: Position
    size: Size    
}

export type ObjectImage = ObjectSlide & {
    src: string
    type: 'image'
}

export type Font = {
    style: "normal" | "italic" | "oblique" | "inherit"
    family: string,
    size: number,
    weight: number,
    lineHeight: number,
}

export type ObjectText = ObjectSlide & {
    value: string
    font: Font
    color: string
    backgroundColor: string
    type: 'text'
}

export type Slide = {
    uid: string
    background: Solid | Image
    objects: Array<ObjectText | ObjectImage>
    selectedObjectIds: Array<string>
}

export type Presentation = {
    name: string
    slides: Slide[]
    selectedSlideIds: string[]
    scale: number
}