import { CSSProperties, useEffect } from 'react';
import { dispatch } from '../../store/editor.ts';
import { BackgroundType, SlideType } from '../../store/PresentationType.ts'
import { selectSlide } from '../../store/selectSlide.ts';
import styles from './ListSlides.module.css';
import { HEIGHT_SLIDE, WIDTH_SLIDE } from '../../store/constants.ts';
import { PreviewSlide } from './PreviewSlide/PreviewSlide.tsx';
import { useDragAndDrop } from '../hooks/useDragAndDrop.tsx';
type SlidesProps = {
    slides: SlideType[],
    selectedSlideIds: string[],
    tempBackground: BackgroundType | null,
}

function ListSlides({ 
    slides, 
    selectedSlideIds,
    tempBackground,
}: SlidesProps)
{
    const dragSlide = useDragAndDrop()

    useEffect(() => {
        if (!dragSlide.dragging) { 
            
        }   
    }, [dragSlide.dragging]);

    function onSelectSlide(slideUid: string) {
        dispatch(selectSlide, slideUid)
    }

    const slideStyles: CSSProperties = {
        width: "170px",
        aspectRatio: `${WIDTH_SLIDE}/${HEIGHT_SLIDE}`,
    }
    const selectedSlides = slides.filter(slide => selectedSlideIds.includes(slide.uid))
    const noSelectedSlides = slides.filter(slide => !selectedSlideIds.includes(slide.uid))
    if (dragSlide.dragging) {
        console.log("drag")
        return (
            <div
                className={styles.slides}
            >
                {noSelectedSlides.map(slide => (
                    <PreviewSlide 
                        key={slide.uid} 
                        slide={slide} 
                        onClick={() => onSelectSlide(slide.uid)}
                        isSelected={selectedSlideIds.includes(slide.uid)}
                        style={slideStyles}
                        tempBackground={
                            selectedSlideIds[0] === slide.uid 
                                ? tempBackground 
                                : null
                        }
                    />
                ))}
            </div>
        )
    }
    return (
        <div
            className={styles.slides}
        >
            {slides.map(slide => (
                <PreviewSlide 
                    key={slide.uid} 
                    slide={slide} 
                    onClick={() => onSelectSlide(slide.uid)}
                    isSelected={selectedSlideIds.includes(slide.uid)}
                    style={slideStyles}
                    tempBackground={
                        selectedSlideIds[0] === slide.uid 
                            ? tempBackground 
                            : null
                    }
                    // onDrag={dragSlide.startDrag}
                 />
            ))}
        </div>
    )
}

export {
    ListSlides
}