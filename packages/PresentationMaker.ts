type Position = {
    x: number
    y: number
}

type Size = {
    width: number
    height: number
}

type Solid = {
    color: string
    type: "solid"
}

type Image = {
    src: string
    type: "image"
}

type ObjectSlide = {
    uid: string
    pos: Position
    size: Size
}

type ObjectImage = ObjectSlide & {
    src: string
    type: 'image'
}

type Font = {
    style: "normal" | "italic" | "oblique" | "inherit"
    family: string,
    size: number,
    weight: number,
    lineHeight: number,
}
// продам гараж недорого 89177146027
// ехал грека через греку видит грека в реке рак 
// сунул грека руку в реку рак за руку греку цап

// type Button = {
//     value: Text|Image
//     click: () => void
// }

type ObjectText = ObjectSlide & {
    value: string
    font: Font
    color: string
    backgroundColor: string
    type: 'text'
}

type Slide = {
    uid: string
    background: Solid | Image
    objects: Array<ObjectText | ObjectImage>
    selectedObjectIds: Array<string>
}

type Presentation = {
    name: string
    slides: Slide[]
    selectedSlideIds: string[]
    scale: number
}

// let hist: Array<Presentation> = []

function renamePresentation(presentation: Presentation, name: string) {
    return {
        ...presentation,
        name: name
    }
}

function generateUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function addSlide(presentation: Presentation): Presentation {
    const { slides, selectedSlideIds } = presentation
    const selectedSlides = slides.filter(slide => selectedSlideIds.includes(slide.uid))
    const lastSelectedIndex = selectedSlides.length > 0
        ? slides.findIndex(slide => slide.uid === selectedSlides[selectedSlides.length - 1].uid)
        : -1
    const newSlide: Slide = {
        uid: generateUID(),
        background: {
            color: "#FFFFFF",
            type: "solid"
        },
        objects: [],
        selectedObjectIds: []
    }
    const newSlides = lastSelectedIndex >= 0
        ? [...slides.slice(0, lastSelectedIndex + 1), newSlide, ...slides.slice(lastSelectedIndex + 1)]
        : [...slides, newSlide]
    return {
        ...presentation,
        slides: newSlides,
        selectedSlideIds: [newSlide.uid]
    }
}

function deleteSlide(presentation: Presentation): Presentation {
    const { slides, selectedSlideIds } = presentation
    if (selectedSlideIds.length === 0) {
        return presentation
    }
    const selectedSlides = slides.filter(slide => selectedSlideIds.includes(slide.uid))
    const newSlides = slides.filter(slide => !selectedSlideIds.includes(slide.uid))
    const firstSelectedSlideIndex = slides.findIndex(slide => slide.uid === selectedSlides[0].uid) 
    const newSelectedSlideIndex = newSlides.length - 1 >= firstSelectedSlideIndex
        ? firstSelectedSlideIndex
        : newSlides.length - 1
    let newSelectedSlideIds: Array<string> = []
    if (newSelectedSlideIndex >= 0) {
        newSelectedSlideIds = [ newSlides[newSelectedSlideIndex].uid ]
        newSlides[newSelectedSlideIndex].selectedObjectIds = []
    }
    return {
        ...presentation,
        slides: newSlides,
        selectedSlideIds: newSelectedSlideIds
    }
}

function changeBackgroundSlide(presentation: Presentation, background: Solid | Image, all: boolean = false): Presentation {
    const { slides, selectedSlideIds } = presentation
    if (selectedSlideIds.length === 0) {
        return presentation
    }
    return {
        ...presentation,
        slides: slides.map(slide => {
            if (slide.uid === selectedSlideIds[0] || all) {
                return {
                    ...slide,
                    background: background
                }
            }
            return slide
        })
    }
}

function moveSlides(presentation: Presentation, targetSlideIndex: number): Presentation {
    const { slides, selectedSlideIds } = presentation
    if (selectedSlideIds.length === 0) {
        return presentation
    }
    const selectedSlides = slides.filter(slide => selectedSlideIds.includes(slide.uid))
    const newSlides = slides.filter(slide => !selectedSlideIds.includes(slide.uid))
    if (targetSlideIndex == -1) {
        return {
            ...presentation,
            slides: [
                ...selectedSlides,
                ...newSlides
            ]
        }
    }
    const newTargetSlideIndex = newSlides.findIndex(slide => slide.uid === slides[targetSlideIndex].uid)
    if (newTargetSlideIndex == -1) {
        return presentation
    }
    return {
        ...presentation,
        slides: [
            ...newSlides.slice(0, newTargetSlideIndex + 1),
            ...selectedSlides,
            ...newSlides.slice(newTargetSlideIndex + 1)
        ]
    }
}

function selectSlide(presentation: Presentation, slideIndex: number): Presentation {
    const { slides } = presentation
    if (slideIndex >= slides.length || slideIndex < 0) {
        return presentation
    }
    return {
        ...presentation,
        slides: [
            ...slides.slice(0, slideIndex),
            {
                ...slides[slideIndex],
                selectedObjectIds: []
            },
            ...slides.slice(slideIndex + 1)
        ],
        selectedSlideIds: [slides[slideIndex].uid]
    }
}

function addSlideToSelection(presentation: Presentation, slideIndex: number): Presentation {
    const { slides, selectedSlideIds } = presentation
    if (slideIndex >= slides.length || slideIndex < 0) {
        return presentation
    }
    if (selectedSlideIds.includes(slides[slideIndex].uid)) {
        if (selectedSlideIds.length == 1) {
            return presentation
        }
        return {
            ...presentation,
            selectedSlideIds: selectedSlideIds.filter(uid => uid != slides[slideIndex].uid)
        }
    } else {
        return {
            ...presentation,
            slides: [
                ...slides.slice(0, slideIndex),
                {
                    ...slides[slideIndex],
                    selectedObjectIds: []
                },
                ...slides.slice(slideIndex + 1)
            ],
            selectedSlideIds: [
                slides[slideIndex].uid,
                ...selectedSlideIds
            ]
        }
    }
}

function addTextToSlide(presentation: Presentation, position: Position, size: Size): Presentation {
    const { slides, selectedSlideIds } = presentation
    if (selectedSlideIds.length == 0) {
        return presentation
    }
    const selectedSlideIndex = slides.findIndex(slide => slide.uid === selectedSlideIds[0])
    const newText: ObjectText = {
        uid: generateUID(),
        pos: position,
        size: size,
        value: "",
        font: {
            style: "normal",
            family: "arial",
            size: 12,
            weight: 400,
            lineHeight: 1
        },
        color: "none",
        backgroundColor: "none",
        type: "text"
    }
    return {
        ...presentation,
        slides: [
            ...slides.slice(0, selectedSlideIndex),
            {
                ...slides[selectedSlideIndex],
                objects: [...slides[selectedSlideIndex].objects, newText],
                selectedObjectIds: [newText.uid]
            },
            ...slides.slice(selectedSlideIndex + 1)
        ],
        selectedSlideIds: [ selectedSlideIds[0] ]
    }
}

function addImageToSlide(presentation: Presentation, src: string, position: Position, size: Size): Presentation {
    const { slides, selectedSlideIds } = presentation
    if (selectedSlideIds.length == 0) {
        return presentation
    }
    const selectedSlideIndex = slides.findIndex(slide => slide.uid === selectedSlideIds[0])
    const newImage: ObjectImage = {
        uid: generateUID(),
        pos: position,
        size: size,
        src: src,
        type: "image"
    }
    return {
        ...presentation,
        slides: [
            ...slides.slice(0, selectedSlideIndex),
            {
                ...slides[selectedSlideIndex],
                objects: [...slides[selectedSlideIndex].objects, newImage],
                selectedObjectIds: [newImage.uid]
            },
            ...slides.slice(selectedSlideIndex + 1)
        ],
        selectedSlideIds: [ selectedSlideIds[0] ]
    }
}

function deleteSlideObjects(presentation: Presentation): Presentation {
    const { slides, selectedSlideIds } = presentation
    if (selectedSlideIds.length == 0) {
        return presentation
    }
    const selectedSlideIndex = slides.findIndex(slide => slide.uid === selectedSlideIds[0])
    const { objects, selectedObjectIds } = slides[selectedSlideIndex]
    if (selectedObjectIds.length == 0) {
        return presentation
    }
    return {
        ...presentation,
        slides: [
            ...slides.slice(0, selectedSlideIndex),
            {
                ...slides[selectedSlideIndex],
                objects: objects.filter(object => !selectedObjectIds.includes(object.uid)),
                selectedObjectIds: []
            },
            ...slides.slice(selectedSlideIndex + 1)
        ],
    }
}

function selectSlideObject(presentation: Presentation, ObjectUid: string): Presentation {
    const { slides, selectedSlideIds } = presentation
    if (selectedSlideIds.length == 0) {
        return presentation
    }
    return {
        ...presentation,
        slides: slides.map(slide => {
            if (slide.uid === selectedSlideIds[0]) {
                return {
                    ...slide,
                    selectedObjectIds: [ ObjectUid ]
                }
            }
            return slide
        }),
        selectedSlideIds: [selectedSlideIds[0]]
    }
}

function addObjectToSelection(presentation: Presentation, ObjectUid: string): Presentation {
    const { slides, selectedSlideIds } = presentation
    if (selectedSlideIds.length == 0) {
        return presentation
    }
    const selectedSlideIndex = slides.findIndex(slide => slide.uid === selectedSlideIds[0])
    const { selectedObjectIds } = slides[selectedSlideIndex]
    if (selectedObjectIds.includes(ObjectUid)) {
        return {
            ...presentation,
            slides: slides.map(slide => {
                if (slide.uid === selectedSlideIds[0]) {
                    return {
                        ...slide,
                        selectedObjectIds: selectedObjectIds.filter(uid => uid != ObjectUid)
                    }
                }
                return slide
            }),
            selectedSlideIds: [selectedSlideIds[0]]
        }
    }
    return {
        ...presentation,
        slides: slides.map(slide => {
            if (slide.uid === selectedSlideIds[0]) {
                return {
                    ...slide,
                    selectedObjectIds: [...selectedObjectIds, ObjectUid ]
                }
            }
            return slide
        }),
        selectedSlideIds: [selectedSlideIds[0]]
    }
}

function removeObjectSelection(presentation: Presentation): Presentation {
    const { slides, selectedSlideIds } = presentation
    if (selectedSlideIds.length == 0) {
        return presentation
    }
    return {
        ...presentation,
        slides: slides.map(slide => {
            if (slide.uid === selectedSlideIds[0]) {
                return {
                    ...slide,
                    selectedObjectIds: []
                }
            }
            return slide
        }),
        selectedSlideIds: [selectedSlideIds[0]]
    }
}

function getGlobalSelectionObject(selectedObjects: Array<ObjectText | ObjectImage>): ObjectSlide {
    let xStart = selectedObjects[0].pos.x
    let yStart = selectedObjects[0].pos.y
    let xEnd = selectedObjects[0].pos.x + selectedObjects[0].size.width
    let yEnd = selectedObjects[0].pos.y + selectedObjects[0].size.height
    selectedObjects.forEach(object => { 
        xStart = Math.min(object.pos.x, xStart)
        yStart = Math.min(object.pos.y, yStart)
        xEnd = Math.max(object.pos.x + object.size.width, xEnd)
        yEnd = Math.max(object.pos.y + object.size.height, yEnd)
    })
    return {
        uid: "",
        pos: {
            x: xStart,
            y: yStart
        },
        size: {
            width: xEnd - xStart,
            height: yEnd - yStart
        }
    }
}

function moveObjects(presentation: Presentation, newPosition: Position): Presentation {
    const { slides, selectedSlideIds } = presentation
    if (selectedSlideIds.length == 0) {
        return presentation
    }
    const selectedSlideIndex = slides.findIndex(slide => slide.uid === selectedSlideIds[0])
    const { objects, selectedObjectIds } = slides[selectedSlideIndex]
    if (selectedObjectIds.length == 0) {
        return presentation
    }
    const selectedObjects: Array<ObjectText | ObjectImage> = objects.filter(object => selectedObjectIds.includes(object.uid))
    const globalSelectionObject: ObjectSlide = getGlobalSelectionObject(selectedObjects)
    
    return {
        ...presentation,
        slides: slides.map(slide => {
            if (slide.uid === selectedSlideIds[0]) {
                return {
                    ...slide,
                    objects: objects.map(object => {
                        if (selectedObjectIds.includes(object.uid)) {
                            return {
                                ...object,
                                pos: {
                                    x: object.pos.x + newPosition.x - globalSelectionObject.pos.x,
                                    y: object.pos.y + newPosition.y - globalSelectionObject.pos.y
                                }
                            }
                        } 
                        return object
                    }),
                }
            }
            return slide
        }),
        selectedSlideIds: [selectedSlideIds[0]]
    }
}

function transformObjects(presentation: Presentation, newPosition: Position, newSize: Size): Presentation {
    const { slides, selectedSlideIds } = presentation
    if (selectedSlideIds.length == 0) {
        return presentation
    }
    const selectedSlideIndex = slides.findIndex(slide => slide.uid === selectedSlideIds[0])
    const { objects, selectedObjectIds } = slides[selectedSlideIndex]
    if (selectedObjectIds.length == 0) {
        return presentation
    }
    const selectedObjects: Array<ObjectText | ObjectImage> = objects.filter(object => selectedObjectIds.includes(object.uid))
    const globalSelectionObject: ObjectSlide = getGlobalSelectionObject(selectedObjects)
    
    return {
        ...presentation,
        slides: slides.map(slide => {
            if (slide.uid === selectedSlideIds[0]) {
                return {
                    ...slide,
                    objects: objects.map(object => {
                        if (selectedObjectIds.includes(object.uid)) {
                            return {
                                ...object,
                                pos: {
                                    x: object.pos.x + newPosition.x - globalSelectionObject.pos.x,
                                    y: object.pos.y + newPosition.y - globalSelectionObject.pos.y
                                },
                                size: {
                                    width: object.size.width * newSize.width / globalSelectionObject.size.width,
                                    height: object.size.height * newSize.height / globalSelectionObject.size.height
                                }
                            }
                        } 
                        return object
                    }),
                }
            }
            return slide
        }),
        selectedSlideIds: [selectedSlideIds[0]]
    }
}

function changeValueToTextObject(presentation: Presentation, value: string): Presentation {
    const { slides, selectedSlideIds } = presentation
    if (selectedSlideIds.length == 0) {
        return presentation
    }

    return {
        ...presentation,
        slides: slides.map(slide => {
            if (slide.uid === selectedSlideIds[0]) {
                return {
                    ...slide,
                    objects: slide.objects.map(object => {
                        if (slide.selectedObjectIds.length > 1 || slide.selectedObjectIds.length === 0) {
                            return object
                        } 
                        if (object.uid === slide.selectedObjectIds[0] && object.type === "text") {
                            return {
                                ...object,
                                value: value
                            }
                        }
                        return object
                    })
                }
            }
            return slide
        })
    }
}

function changeFontToTextObject(presentation: Presentation, font: Font): Presentation {
    const { slides, selectedSlideIds } = presentation
    if (selectedSlideIds.length == 0) {
        return presentation
    }

    return {
        ...presentation,
        slides: slides.map(slide => {
            if (slide.uid === selectedSlideIds[0]) {
                return {
                    ...slide,
                    objects: slide.objects.map(object => {
                        if (slide.selectedObjectIds.length > 1 || slide.selectedObjectIds.length === 0) {
                            return object
                        } 
                        if (object.uid === slide.selectedObjectIds[0] && object.type === "text") {
                            return {
                                ...object,
                                font: font
                            }
                        }
                        return object
                    })
                }
            }
            return slide
        })
    }
}

function changeSrcToImageObject(presentation: Presentation, src: string): Presentation {
    const { slides, selectedSlideIds } = presentation
    if (selectedSlideIds.length == 0) {
        return presentation
    }

    return {
        ...presentation,
        slides: slides.map(slide => {
            if (slide.uid === selectedSlideIds[0]) {
                return {
                    ...slide,
                    objects: slide.objects.map(object => {
                        if (slide.selectedObjectIds.length > 1 || slide.selectedObjectIds.length === 0) {
                            return object
                        } 
                        if (object.uid === slide.selectedObjectIds[0] && object.type === "image") {
                            return {
                                ...object,
                                src: src
                            }
                        }
                        return object
                    })
                }
            }
            return slide
        })
    }
}

const presentationMin: Presentation = {
    name: 'New Presentation',
    slides: [],
    selectedSlideIds: [],
    scale: 1
}


//
const presentationMax: Presentation= {
    name: 'New presentation',
    slides: [
      {
        uid: '28b0e84e-eb72-4f63-9cc9-1ed47ea3e07b',
        background: { color: '#FFFFFF', type: 'solid' },
        objects: [
          {
            uid: 'a4764091-6cf2-4b5a-a586-ede15a722b86',
            pos: { x: 100, y: 100 },
            size: { width: 100, height: 100 },
            src: 'ImageSrc',
            type: 'image'
          },
          {
            uid: '25f6059b-42ca-40c9-95be-0502cd0844b2',
            pos: { x: 100, y: 100 },
            size: { width: 100, height: 100 },
            value: '',
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
        background: { src: 'test-src', type: 'image' },
        objects: [
          {
            uid: 'a8fa7818-7232-4981-b369-1b8fcced8d5f',
            pos: { x: 100, y: 100 },
            size: { width: 100, height: 100 },
            src: 'ImageSrc',
            type: 'image'
          },
          {
            uid: '40fd75e3-2abc-4b14-a02b-31740e2774d2',
            pos: { x: 100, y: 100 },
            size: { width: 100, height: 100 },
            value: '',
            font: {
              style: 'normal',
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
        selectedObjectIds: [ '40fd75e3-2abc-4b14-a02b-31740e2774d2' ]
      }
    ],
    selectedSlideIds: [ 'b28d7ce8-86c7-4e45-8cbd-79e8fbf8c465', '28b0e84e-eb72-4f63-9cc9-1ed47ea3e07b' ],
    scale: 1
  }

let presentation: Presentation

// // min func renamePresentation
// console.log('\nДо renamePresentation')
// console.dir(presentationMin, { depth: null })
// presentation = renamePresentation(presentationMin, "Ersulov") 
// console.log('\nПосле renamePresentation')
// console.dir(presentation, { depth: null })

// // max func renamePresentation
// console.log('\nДо renamePresentation')
// console.dir(presentationMax, { depth: null })
// presentation = renamePresentation(presentationMax, "Ersulov") 
// console.log('\nПосле renamePresentation')
// console.dir(presentation, { depth: null })


// // min func addSlide
// console.log('\nДо addSlide')
// console.dir(presentationMin, { depth: null })
// presentation = addSlide(presentationMin) 
// console.log('\nПосле addSlide')
// console.dir(presentation, { depth: null })

// // max func addSlide
// console.log('\nДо addSlide')
// console.dir(presentationMax, { depth: null })
// presentation = addSlide(presentationMax) 
// console.log('\nПосле addSlide')
// console.dir(presentation, { depth: null })





// // min func deleteSlide
// console.log('\nMin До deleteSlide')
// console.dir(presentationMin, { depth: null })
// presentation = deleteSlide(presentationMin) 
// console.log('\nMin После deleteSlide')
// console.dir(presentation, { depth: null })


// // max func deleteSlide
// console.log('\nMax До deleteSlide')
// console.dir(presentationMax, { depth: null })
// presentation = deleteSlide(presentationMax) 
// console.log('\nMax После deleteSlide')
// console.dir(presentation, { depth: null })





// //min moveSlides
// console.log('\nMin До moveSlide')
// console.dir(presentationMin, { depth: null })
// presentation = moveSlides(presentationMin, -1) 
// console.log('\nMin После moveSlide')
// console.dir(presentation, { depth: null })

// // max func moveSlide
// console.log('\nMax До moveSlide')
// console.dir(presentationMax, { depth: null })
// presentation = moveSlides(presentationMax, -1) 
// console.log('\nMax После moveSlide')
// console.dir(presentation, { depth: null })





// //min changeBackgroundSlide
// console.log('\nMin До changeBackgroundSlide')
// console.dir(presentationMin, { depth: null })
// presentation = changeBackgroundSlide(presentationMin, {src: "test", type: 'image'}) 
// console.log('\nMin После changeBackgroundSlide')
// console.dir(presentation, { depth: null })

// // max func moveSlide
// console.log('\nMax До changeBackgroundSlide')
// console.dir(presentationMax, { depth: null })
// presentation = changeBackgroundSlide(presentationMax, {src: "test", type: 'image'}, true) 
// console.log('\nMax После changeBackgroundSlide')
// console.dir(presentation, { depth: null })






//min moveSlides
console.log('\nMin До selectSlide')
console.dir(presentationMin, { depth: null })
presentation = selectSlide(presentationMin, 0) 
console.log('\nMin После selectSlide')
console.dir(presentation, { depth: null })

// max func moveSlide
console.log('\nMax До selectSlide')
console.dir(presentationMax, { depth: null })
presentation = selectSlide(presentationMax, 0) 
console.log('\nMax После selectSlide')
console.dir(presentation, { depth: null })






console.log('\nMin До addSlideToSelection')
console.dir(presentationMin, { depth: null })
presentation = addSlideToSelection(presentationMin, 0) 
console.log('\nMin После addSlideToSelection')
console.dir(presentation, { depth: null })

// max func moveSlide
console.log('\nMax До addSlideToSelection')
console.dir(presentationMax, { depth: null })
presentation = addSlideToSelection(presentationMax, 0) 
console.log('\nMax После addSlideToSelection')
console.dir(presentation, { depth: null })



console.log('\nMin До addTextToSlide')
console.dir(presentationMin, { depth: null })
presentation = addTextToSlide(presentationMin, {x: 0, y: 0}, {width: 100, height: 100}) 
console.log('\nMin После addTextToSlide')
console.dir(presentation, { depth: null })

// max func moveSlide
console.log('\nMax До addTextToSlide')
console.dir(presentationMax, { depth: null })
presentation = addTextToSlide(presentationMax, {x: 0, y: 0}, {width: 100, height: 100}) 
console.log('\nMax После addTextToSlide')
console.dir(presentation, { depth: null })




console.log('\nMin До addImageToSlide')
console.dir(presentationMin, { depth: null })
presentation = addImageToSlide(presentationMin, 'src-test', {x: 0, y: 0}, {width: 100, height: 100}) 
console.log('\nMin После addImageToSlide')
console.dir(presentation, { depth: null })

// max func moveSlide
console.log('\nMax До addImageToSlide')
console.dir(presentationMax, { depth: null })
presentation = addImageToSlide(presentationMax, 'src-test', {x: 0, y: 0}, {width: 100, height: 100}) 
console.log('\nMax После addImageToSlide')
console.dir(presentation, { depth: null })




console.log('\nMin До deleteSlideObjects')
console.dir(presentationMin, { depth: null })
presentation = deleteSlideObjects(presentationMin) 
console.log('\nMin После deleteSlideObjects')
console.dir(presentation, { depth: null })

// max func moveSlide
console.log('\nMax До deleteSlideObjects')
console.dir(presentationMax, { depth: null })
presentation = deleteSlideObjects(presentationMax) 
console.log('\nMax После deleteSlideObjects')
console.dir(presentation, { depth: null })






console.log('\nMin До selectSlideObject')
console.dir(presentationMin, { depth: null })
presentation = selectSlideObject(presentationMin, 'a8fa7818-7232-4981-b369-1b8fcced8d5f') 
console.log('\nMin После selectSlideObject')
console.dir(presentation, { depth: null })

// max func moveSlide
console.log('\nMax До selectSlideObject')
console.dir(presentationMax, { depth: null })
presentation = selectSlideObject(presentationMax, 'a8fa7818-7232-4981-b369-1b8fcced8d5f') 
console.log('\nMax После selectSlideObject')
console.dir(presentation, { depth: null })





console.log('\nMin До addObjectToSelection')
console.dir(presentationMin, { depth: null })
presentation = addObjectToSelection(presentationMin, 'a8fa7818-7232-4981-b369-1b8fcced8d5f') 
console.log('\nMin После addObjectToSelection')
console.dir(presentation, { depth: null })

// max func moveSlide
console.log('\nMax До addObjectToSelection')
console.dir(presentationMax, { depth: null })
presentation = addObjectToSelection(presentationMax, 'a8fa7818-7232-4981-b369-1b8fcced8d5f') 
console.log('\nMax После addObjectToSelection')
console.dir(presentation, { depth: null })





// console.log('\nMin До removeObjectSelection')
// console.dir(presentationMin, { depth: null })
// presentation = removeObjectSelection(presentationMin) 
// console.log('\nMin После removeObjectSelection')
// console.dir(presentation, { depth: null })

// // max func moveSlide
// console.log('\nMax До removeObjectSelection')
// console.dir(presentationMax, { depth: null })
// presentation = removeObjectSelection(presentationMax) 
// console.log('\nMax После removeObjectSelection')
// console.dir(presentation, { depth: null })




// console.log('\nMin До moveObjects')
// console.dir(presentationMin, { depth: null })
// presentation = moveObjects(presentationMin, {x: 200, y:200}) 
// console.log('\nMin После moveObjects')
// console.dir(presentation, { depth: null })

// // max func moveSlide
// console.log('\nMax До moveObjects')
// console.dir(presentationMax, { depth: null })
// presentation = moveObjects(presentationMax, {x: 200, y:200}) 
// console.log('\nMax После moveObjects')
// console.dir(presentation, { depth: null })




// console.log('\nMin До transformObjects')
// console.dir(presentationMin, { depth: null })
// presentation = transformObjects(presentationMin, {x: 300, y:300}, {width: 300, height: 300}) 
// console.log('\nMin После transformObjects')
// console.dir(presentation, { depth: null })

// // max func moveSlide
// console.log('\nMax До transformObjects')
// console.dir(presentationMax, { depth: null })
// presentation = transformObjects(presentationMax, {x: 300, y:300}, {width: 300, height: 300}) 
// console.log('\nMax После transformObjects')
// console.dir(presentation, { depth: null })






// console.log('\nMin До changeValueToTextObject')
// console.dir(presentationMin, { depth: null })
// presentation = changeValueToTextObject(presentationMin, 'Test-Text') 
// console.log('\nMin После changeValueToTextObject')
// console.dir(presentation, { depth: null })

// // max func moveSlide
// console.log('\nMax До changeValueToTextObject')
// console.dir(presentationMax, { depth: null })
// presentation = changeValueToTextObject(presentationMax, 'Test-Text') 
// console.log('\nMax После changeValueToTextObject')
// console.dir(presentation, { depth: null })






// console.log('\nMin До changeFontToTextObject')
// console.dir(presentationMin, { depth: null })
// presentation = changeFontToTextObject(presentationMin, {style: 'oblique', family: 'Times', size: 40, weight: 900, lineHeight: 2}) 
// console.log('\nMin После changeFontToTextObject')
// console.dir(presentation, { depth: null })

// // max func moveSlide
// console.log('\nMax До changeFontToTextObject')
// console.dir(presentationMax, { depth: null })
// presentation = changeFontToTextObject(presentationMax, {style: 'oblique', family: 'Times', size: 40, weight: 900, lineHeight: 2}) 
// console.log('\nMax После changeFontToTextObject')
// console.dir(presentation, { depth: null })





// console.log('\nMin До changeSrcToImageObject')
// console.dir(presentationMin, { depth: null })
// presentation = changeSrcToImageObject(presentationMin, 'new-src-test') 
// console.log('\nMin После changeSrcToImageObject')
// console.dir(presentation, { depth: null })

// // max func moveSlide
// console.log('\nMax До changeSrcToImageObject')
// console.dir(presentationMax, { depth: null })
// presentation = changeSrcToImageObject(presentationMax, 'new-src-test')  
// console.log('\nMax После changeSrcToImageObject')
// console.dir(presentation, { depth: null })