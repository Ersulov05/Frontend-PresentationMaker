import { Presentation } from "./PresentationType"


const PresentationMin: Presentation = {
    name: "My Presentation",
    slides: [],
    selectedSlideIds: [],
    scale: 1,
}

const PresentationMax: Presentation = {
    name: 'New presentation',
    slides: [
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
            selectedObjectIds: [ '25f6059b-42ca-40c9-95be-0502cd0844b2' ]
        },
        {
            uid: 'b28d7ce8-86c7-4e45-8cbd-79e8fbf8c465',
            background: { src: '/image/fon.jpeg', type: 'image' },
            objects: [
                {
                uid: 'a8fa7818-7232-4981-b369-1b8fcced8d5f',
                pos: { x: 100, y: 100 },
                size: { width: 100, height: 100 },
                src: '/image/react.svg',
                type: 'image'
                },
                {
                uid: '40fd75e3-2abc-4b14-a02b-31740e2774d2',
                pos: { x: -200, y: 200 },
                size: { width: 100, height: 100 },
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
            selectedObjectIds: [ '40fd75e3-2abc-4b14-a02b-31740e2774d2', 'a8fa7818-7232-4981-b369-1b8fcced8d5f' ]
        }
    ],
    selectedSlideIds: [ 'b28d7ce8-86c7-4e45-8cbd-79e8fbf8c465', '28b0e84e-eb72-4f63-9cc9-1ed47ea3e07b' ],
    scale: 1
}

export {
    PresentationMin, PresentationMax
}
