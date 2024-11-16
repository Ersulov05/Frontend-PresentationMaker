import { CSSProperties, forwardRef } from 'react';
import { BackgroundType, SlideType } from '../../../store/PresentationType.ts'; 
import styles from './SlidesDrag.module.css';

type SlidesDragProps = {
    x: number
    y: number
    slide: SlideType
    isSelected?: boolean
    scale?: number
    style?: CSSProperties
    tempBackground: BackgroundType | null
}

const SlidesDrag = forwardRef<HTMLDivElement, SlidesDragProps>(({
    x,
    y,
    slide,
    isSelected = false,
    scale = 1,
    style = {},
    tempBackground,
}, ref) => {

    const backgroundStyle = tempBackground 
        ? tempBackground.type === "solid"
            ? { backgroundColor: tempBackground.color }
            : { backgroundImage: `url(${tempBackground.src})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' }
        : slide.background.type === 'solid'
            ? { backgroundColor: slide.background.color }
            : { backgroundImage: `url(${slide.background.src})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' }

    const slideStyles: CSSProperties = {
        position: "absolute",
        top: y + "px",
        left: x + "px",
        ...backgroundStyle,
        ...style
    }

    return (
        <div ref={ref} 
            className={`${styles.slide} ${isSelected ? styles.slideSelected : ''}`}
            style={slideStyles}
        >   
        </div>
    )
})

export {
    SlidesDrag
}