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

    const getBackgroundStyle = (background: BackgroundType) => {  
        switch (background.type) {
            case "solid":
                return { backgroundColor: background.color }
            case "gradient":
                return {
                    background: `linear-gradient(${background.angle}deg, ${background.colors.join(', ')})`
                }
            case "image":
                return {
                    backgroundImage: `url(${background.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }
            default:
                return {}
        }
    }

    const backgroundStyle = background 
        ? getBackgroundStyle(background) 
        : getBackgroundStyle(slide.background)

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
            data-uid={slide.uid}
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