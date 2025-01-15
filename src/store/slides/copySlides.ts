import { SlideType } from "../PresentationType";
import { EditorType } from "../redux/EditorType";
import { generateUID } from "../utils/generateUID";


function getCopiedSlides(selectedSlides: SlideType[]): SlideType[] 
{
    const newSlides: SlideType[] = selectedSlides.map(slide => {
        return {
            ...slide,
            objects: slide.objects.map(object => {
                return {
                    ...object,
                    uid: generateUID()
                }
            }),
            uid: generateUID()
        }
    })

    return newSlides
}

function copySlides(editor: EditorType): EditorType {
    const { slides } = editor.presentation
    const { selectedSlideIds } = editor.selection
    if (selectedSlideIds.length === 0) return editor
    const selectedSlides = slides.filter(slide => selectedSlideIds.includes(slide.uid))
    const lastSelectedIndex = selectedSlides.length > 0
        ? slides.findIndex(slide => slide.uid === selectedSlides[selectedSlides.length - 1].uid)
        : -1
    const newCopiedSlides = getCopiedSlides(selectedSlides)
    const newCopiedSlidesIds = newCopiedSlides.map(slide => slide.uid)
    const newSlides = lastSelectedIndex >= 0
        ? [...slides.slice(0, lastSelectedIndex + 1), ...newCopiedSlides, ...slides.slice(lastSelectedIndex + 1)]
        : [...slides, ...newCopiedSlides]
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        selection: {
            ...editor.selection,
            selectedObjectIds: [],
            selectedSlideIds: newCopiedSlidesIds
        }
    }
}

export {
    copySlides
}