import { CSSProperties } from 'react';
import { dispatch } from '../../store/editor.ts';
import { SlideType } from '../../store/PresentationType.ts'
import { selectSlide } from '../../store/selectSlide.ts';
import styles from './ListSlides.module.css';
import { HEIGHT_SLIDE, WIDTH_SLIDE } from '../../store/constants.ts';
import { PreviewSlide } from './PreviewSlide/PreviewSlide.tsx';
type SlidesProps = {
    slides: SlideType[],
    selectedSlideIds: string[],
}

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
                <PreviewSlide 
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