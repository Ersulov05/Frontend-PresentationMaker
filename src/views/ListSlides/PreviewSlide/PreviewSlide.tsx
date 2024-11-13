import { useRef, useEffect, useState, CSSProperties } from 'react';
import { BackgroundType, SlideType } from '../../../store/PresentationType.ts'; 
import styles from './PreviewSlide.module.css';
import { WIDTH_SLIDE, HEIGHT_SLIDE } from '../../../store/constants.ts'
import TextObject from './TextObject/TextObject.tsx';
import ImageObject from './ImageObject/ImageObject.tsx';
import { useDragAndDrop } from '../../hooks/useDragAndDrop.tsx';

type SlideProps = {
    slide: SlideType
    isSelected?: boolean
    style?: CSSProperties
    onClick?: () => void
    onDrag?: (event: React.MouseEvent<HTMLDivElement>) => void
    tempBackground: BackgroundType | null
}

function PreviewSlide({ 
    slide, 
    isSelected = false, 
    style = {}, 
    onClick,
    onDrag,
    tempBackground,
}: SlideProps)
{
    const parentRef = useRef<HTMLDivElement | null>(null);
    const [scale, setScale] = useState<number>(0.2)
    const drag = useDragAndDrop()
    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            if (parentRef.current) {
                setScale(Math.min(parentRef.current.offsetWidth / WIDTH_SLIDE, parentRef.current.offsetHeight / HEIGHT_SLIDE,));
            }
        });
        if (parentRef.current) {
            resizeObserver.observe(parentRef.current);
        }
        return () => {
            resizeObserver.disconnect(); 
        };
    }, []); 

    // useEffect(() => {
    //     if (drag.position.x === 0 && drag.position.y === 0) {
    //         console.log("++")
    //         if (onClick) {
    //             onClick()
    //         }
    //     }
    //     drag.position.x = 0
    //     drag.position.y = 0
    // }, [drag.position]); 

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
        ...backgroundStyle,
        ...style
    }
    return (
        <div ref={parentRef} 
            className={`${styles.slide} ${isSelected ? styles.slideSelected : ''}`}
            onClick={onClick}
            style={slideStyles}
            // onMouseDown={onDrag}
        >
            {slide.objects.map(object => (
                (object.type == 'text')
                    ? <TextObject key={object.uid} object={object} widthCoef={scale}/>
                    : <ImageObject key={object.uid} object={object} widthCoef={scale}/>
            ))}
        </div>
    )
}

export {
    PreviewSlide
}