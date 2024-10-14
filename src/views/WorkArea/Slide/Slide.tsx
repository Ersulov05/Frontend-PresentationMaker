import { useRef, useEffect, useState, CSSProperties } from 'react';
import { SlideType } from '../../../store/PresentationType.ts'; 
import styles from './Slide.module.css';
import { WIDTH_SLIDE, HEIGHT_SLIDE } from '../../../store/constants.ts'
import TextObject from './TextObject/TextObject.tsx';
import ImageObject from './ImageObject/ImageObject.tsx';

type SlideProps = {
    slide: SlideType;
    isSelected?: boolean;
    style?: CSSProperties;
    onClick?: () => void;
}

function Slide({ slide, isSelected = false, style = {}, onClick = undefined }: SlideProps)
{

    const parentRef = useRef<HTMLDivElement | null>(null); 
    const [scale, setScale] = useState<number>(0.2);
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
    const backgroundStyle = slide.background.type === 'solid'
        ? { backgroundColor: slide.background.color }
        : { backgroundImage: `url(${slide.background.src})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' }; 
    const slideStyles: CSSProperties = {
        ...backgroundStyle,
        width: `${ scale * WIDTH_SLIDE }px`,
        height: `${ scale * HEIGHT_SLIDE }px`,
        ...style
    }
    return (
        <div ref={parentRef} 
            className={`${styles.slide} ${isSelected ? styles.slideSelected : ''}`}
            onClick={onClick}
            style={slideStyles}
        >
            {slide.objects.map(object => (
                (object.type == 'text')
                    ? <TextObject key={object.uid} object={object} widthCoef={scale}/>
                    : <ImageObject key={object.uid} object={object} widthCoef={scale}/>
            ))}
        </div>
    )
}

export default Slide