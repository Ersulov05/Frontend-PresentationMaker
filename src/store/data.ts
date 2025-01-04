import { validateEditorData } from "../services/validationTypes"
import { PresentationType } from "./PresentationType"
import { EditorType, KeyCodeType } from "./redux/EditorType"

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
                color: '#ff00ff',
                backgroundColor: '#00fff0',
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
                color: 'none',
                backgroundColor: 'none',
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
                color: '#ff00ff',
                backgroundColor: '#00fff0',
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
            keys: new Set<KeyCodeType>()
        }
    }
}

const defaultEditor: EditorType = localEditor ??
    {
        presentation: PresentationMax,
        selection: {
            selectedSlideIds: [ '28b0e84e-eb72-4f63-9cc9-1ed47ea3e07b', 'b27d7ce8-86c7-4e45-8cbd-79e8fbf8c465', 'b28d7ce8-86c7-4e45-8cbd-79e8fbf8c465' ],
            selectedObjectIds: []
        },
        colors: [],
        searchedImages: [],
        keys: new Set<KeyCodeType>()
    }

export {
    PresentationMax, 
    defaultEditor
}
