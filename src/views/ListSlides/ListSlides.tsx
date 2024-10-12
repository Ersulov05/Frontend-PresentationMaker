import { CSSProperties } from 'react';
import { dispatch } from '../../store/editor.ts';
import { SlideType } from '../../store/PresentationType.ts'
import { selectSlide } from '../../store/selectSlide.ts';
import Slide from '../Slide/Slide.tsx';
import styles from './ListSlides.module.css';
import { HEIGHT_SLIDE, WIDTH_SLIDE } from '../../store/constants.ts';
type SlidesProps = {
    slides: SlideType[],
    selectedSlideIds: string[],
}

// const SLIDE_PREVIEW_SCALE: number = 0.2

function ListSlides({ slides, selectedSlideIds }: SlidesProps)
{
    function onSelectSlide(slideUid: string) {
        dispatch(selectSlide, slideUid)
    }

    const slideStyles: CSSProperties = {
        width: "100%",
        aspectRatio: `${WIDTH_SLIDE}/${HEIGHT_SLIDE}`,
    }

    return (
        <div
            className={styles.slides}
        >
            {slides.map(slide => (
                <Slide 
                    key={slide.uid} 
                    slide={slide} 
                    onClick={() => onSelectSlide(slide.uid)}
                    isSelected={selectedSlideIds.includes(slide.uid)}
                    style={slideStyles}
                 />
            ))}
        </div>
    )
}

export {
    ListSlides
}