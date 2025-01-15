import { validateEditorData } from "../services/validationTypes"
import { PresentationType, SlideType } from "./PresentationType"
import { EditorType } from "./redux/EditorType"

const PresentationMax: PresentationType = {
    name: 'New presentation',
    slides: [
        {
            uid: 'b28d7ce8-86c7-4e45-8cbd-79e8fbf8c465',
            background: { src: '/image/fon.jpeg', type: 'image' },
            objects: [
                {
                uid: 'a8fa7818-7232-4981-b369-1b8fcced8d5f',
                pos: { x: 0, y: 0 },
                size: { width: 50, height: 50 },
                src: '/image/Test.svg',
                rotation: 0,
                type: 'image'
                },
                {
                uid: '40fd75e3-2abc-4b14-a02b-31740e2774d2',
                pos: { x: 50, y: 50 },
                size: { width: 50, height: 50 },
                value: 'text',
                font: {
                    style: 'normal',
                    family: 'arial',
                    size: 36,
                    weight: 400,
                    lineHeight: 1
                },
                color: {
                    type: "solid",
                    color: "#000000"
                },
                backgroundColor: {
                    type: "solid",
                    color: "#00000000"
                },
                rotation: 0,
                type: 'text'
                }
            ],
        },
        {
            uid: '28b0e84e-eb72-4f63-9cc9-1ed47ea3e07b',
            background: { color: '#AF00F1', type: 'solid' },
            objects: [
                {
                uid: 'a4764091-6cf2-4b5a-a586-ede15a722b86',
                pos: { x: -100, y: 100 },
                size: { width: 100, height: 100 },
                src: '/image/react.svg',
                rotation: 0,
                type: 'image'
                },
                {
                uid: '25f6059b-42ca-40c9-95be-0502cd0844b2',
                pos: { x: 0, y: 100 },
                size: { width: 100, height: 100 },
                value: 'Тут текст',
                font: {
                    style: 'italic',
                    family: 'arial',
                    size: 12,
                    weight: 400,
                    lineHeight: 1
                },
                color: {
                    type: "solid",
                    color: "#000000"
                },
                backgroundColor: {
                    type: "solid",
                    color: "#00000000"
                },
                rotation: 0,
                type: 'text'
                }
            ],
        },
        {
            uid: 'b27d7ce8-86c7-4e45-8cbd-79e8fbf8c465',
            background: { src: '/image/fon.jpeg', type: 'image' },
            objects: [
                {
                uid: 'a7fa7818-7232-4981-b369-1b8fcced8d5f',
                pos: { x: 0, y: 0 },
                size: { width: 50, height: 50 },
                src: '/image/Test.svg',
                rotation: 0,
                type: 'image'
                },
                {
                uid: '41fd75e3-2abc-4b14-a02b-31740e2774d2',
                pos: { x: 50, y: 50 },
                size: { width: 50, height: 50 },
                value: 'text',
                font: {
                    style: 'normal',
                    family: 'arial',
                    size: 36,
                    weight: 400,
                    lineHeight: 1
                },
                color: {
                    type: "solid",
                    color: "#000000"
                },
                backgroundColor: {
                    type: "solid",
                    color: "#00000000"
                },
                rotation: 0,
                type: 'text'
                }
            ],
        }
    ],
    scale: 1
}

let localEditor: EditorType | null = null

const data = localStorage.getItem('localData')
if (data) {
    const editorData = JSON.parse(data)
    if (validateEditorData(editorData)) {
        localEditor = {
            ...editorData,
            keys: new Set<string>()
        }
    }
}

export const firstSlide: SlideType = {
    uid: 'b28d7ce8-86c7-4e45-8cbd-79e8fbf8c465',
    background: {
        type: "solid",
        color: "#ffffff"
    },
    objects: [
        {
        uid: '40fd75e3-2abc-4b14-a02b-31740e2774d2',
        pos: { x: 260, y: 70 },
        size: { width: 400, height: 400 },
        src: "/image/iconPlus2.svg",
        type: 'image',
        rotation: 0,
        },
    ],
} 

export const defaultPresintation: PresentationType = {
    name: 'New presentation',
    slides: [
        {
            uid: 'b28d7ce8-86c7-4e45-8cbd-79e8fbf8c465',
            background: {
                type: "solid",
                color: "#ffffff"
            },
            objects: [
                {
                uid: '40fd75e3-2abc-4b14-a02b-31740e2774d2',
                pos: { x: 320, y: 150 },
                size: { width: 400, height: 70 },
                value: 'Заголовок',
                font: {
                    style: 'normal',
                    family: 'arial',
                    size: 60,
                    weight: 400,
                    lineHeight: 1
                },
                color: {
                    type: "solid",
                    color: "#000000"
                },
                backgroundColor: {
                    type: "solid",
                    color: "#00000000"
                },
                rotation: 0,
                type: 'text'
                },
                {
                    uid: '50fd75e3-2abc-4b14-a02b-31740e2774d2',
                    pos: { x: 380, y: 300 },
                    size: { width: 200, height: 50 },
                    value: 'Подзаголовок',
                    font: {
                        style: 'normal',
                        family: 'arial',
                        size: 25,
                        weight: 400,
                        lineHeight: 1
                    },
                    color: {
                        type: "solid",
                        color: "#000000"
                    },
                    backgroundColor: {
                        type: "solid",
                        color: "#00000000"
                    },
                    rotation: 0,
                    type: 'text'
                }
            ],
        }
    ],
    scale: 1
}

const defaultEditor: EditorType = localEditor ??
    {
        presentation: defaultPresintation,
        selection: {
            selectedSlideIds: [ '28b0e84e-eb72-4f63-9cc9-1ed47ea3e07b', 'b27d7ce8-86c7-4e45-8cbd-79e8fbf8c465', 'b28d7ce8-86c7-4e45-8cbd-79e8fbf8c465' ],
            selectedObjectIds: []
        },
        colors: [
            {
                color: "#000000",
                type: "solid"
            },
            {
                color: "#ff0000",
                type: "solid"
            },
            {
                color: "#0000ff",
                type: "solid"
            },
            {
                colors: ["#000000", "#ff0000"],
                angle: 0,
                type: "gradient"
            },
            {
                colors: ["#00ff00", "#ff0000"],
                angle: 0,
                type: "gradient"
            },
            {
                colors: ["#0000ff", "#ff0000"],
                angle: 0,
                type: "gradient"
            }
        ],
        searchedImages: [],
        keys: new Set<string>()
    }

export {
    PresentationMax, 
    defaultEditor
}
