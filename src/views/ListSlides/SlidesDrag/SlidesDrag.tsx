import { CSSProperties, forwardRef } from 'react';
import { SlideType } from '../../../store/PresentationType.ts'; 
import styles from './SlidesDrag.module.css';
import { PreviewSlide } from '../PreviewSlide/PreviewSlide.tsx';

type SlidesDragProps = {
    x: number
    y: number
    slides: SlideType[]
    scale?: number
    style?: CSSProperties
}

const SlidesDrag = forwardRef<HTMLDivElement, SlidesDragProps>(({
    x,
    y,
    slides,
    scale = 1,
    style = {},
}, ref) => {
    if (slides.length < 0) {
        return null
    }
    const countPreviewSlides = 3
    const offset = 5
    const previewSlides = slides.slice(0, countPreviewSlides)

    const containerStyles: CSSProperties = {
        top: y + "px",
        left: x + "px",
    }

    return (
        <div 
            className={styles.slidesDragContainer} 
            style={containerStyles} 
            ref={ref}
        >
            {previewSlides.map((slide, index) => {
                return <PreviewSlide
                    key={slide.uid}
                    scale={scale}
                    slide={slide}
                    style={{
                        ...style, 
                        position:"absolute",
                        top: (previewSlides.length - index - 1) * offset + "px",
                        left: (previewSlides.length  - index - 1) * offset + "px",
                    }}
                />
            })}
        </div>
        
    )
})

export {
    SlidesDrag
}