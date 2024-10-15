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

export type BaseObject = {
    uid: string
    pos: Position
    size: Size    
}

export type ObjectImage = BaseObject & {
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

export type ObjectText = BaseObject & {
    value: string
    font: Font
    color: string
    backgroundColor: string
    type: 'text'
}

export type ObjectType = ObjectText | ObjectImage
export type BackgroundType = Solid | Image

export type SlideType = {
    uid: string
    background: BackgroundType
    objects: ObjectType[]
    selectedObjectIds: string[]
}

export type Presentation = {
    name: string
    slides: SlideType[]
    selectedSlideIds: string[]
    scale: number
}