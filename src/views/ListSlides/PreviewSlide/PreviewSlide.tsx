import { useRef, useState, CSSProperties } from 'react';
import { BackgroundType, SlideType } from '../../../store/PresentationType.ts'; 
import styles from './PreviewSlide.module.css';
import TextObject from './TextObject/TextObject.tsx';
import ImageObject from './ImageObject/ImageObject.tsx';

type SlideProps = {
    slide: SlideType
    isSelected?: boolean
    scale?: number
    style?: CSSProperties
    onClick?: () => void
    onDrag?: (event: React.MouseEvent<HTMLDivElement>, x: number, y: number) => void
    background?: BackgroundType | null
}

function PreviewSlide({ 
    slide, 
    isSelected = false, 
    scale = 1,
    style = {}, 
    onClick,
    onDrag,
    background,
}: SlideProps)
{
    const parentRef = useRef<HTMLDivElement | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [mouseMoved, setMouseMoved] = useState<boolean>(false);

    const backgroundStyle = background 
        ? background.type === "solid"
            ? { backgroundColor: background.color }
            : { backgroundImage: `url(${background.src})`, 
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

    const handleMouseDown = () => {
        setIsDragging(true);
        setMouseMoved(false);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!mouseMoved && isDragging && isSelected) {
            setMouseMoved(true);
            if (onDrag && parentRef.current) {
                const slide = parentRef.current.getBoundingClientRect();
                onDrag(event, -slide.left, -slide.top + slide.height)
            }
        }
    };

    const handleMouseUp = () => {
        if (!mouseMoved && onClick) {
            onClick();
        }
        setIsDragging(false);
        setMouseMoved(false);
    };

    return (
        <div 
            ref={parentRef}
            className={`${styles.slide} ${isSelected ? styles.slideSelected : ''}`}
            data-at="slide"
            style={slideStyles}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
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