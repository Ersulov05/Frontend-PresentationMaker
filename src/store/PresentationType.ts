export type Position = {
    x: number
    y: number
}

export type Size = {
    width: number
    height: number
}

export type TransformType = {
    position: Position,
    size: Size,
    rotation: number
}

export type Solid = {
    color: string
    type: "solid"
}

export type Image = {
    src: string
    type: "image"
}

export type Gradient = {
    colors: string[]
    angle: number
    type: "gradient"
}

export type BaseObject = {
    uid: string
    pos: Position
    size: Size
    rotation: number
}

export type ObjectImageType = BaseObject & {
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

export type ObjectTextType = BaseObject & {
    value: string
    font: Font
    color: Solid | Gradient
    backgroundColor: Solid | Gradient
    type: 'text'
}

export type ObjectType = ObjectTextType | ObjectImageType
export type BackgroundType = Solid | Image | Gradient

export type SlideType = {
    uid: string
    background: BackgroundType
    objects: ObjectType[]
}

export type PresentationType = {
    name: string
    slides: SlideType[]
    scale: number
}