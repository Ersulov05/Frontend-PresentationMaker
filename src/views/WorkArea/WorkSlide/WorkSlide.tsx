// import React from 'react'
import { useRef, useEffect, useState } from 'react';
import { Slide as SlideType } from '../../../store/Presentation.ts'; 
import styles from './WorkSlide.module.css';
import TextObject from './Objects/TextObject.tsx';
import ImageObject from './Objects/ImageObject.tsx';
import {WIDTH_SLIDE} from '../../../constants.ts'
import Selection from './Selection/Selection.tsx';

interface SlideProps {
    slide?: SlideType; 
}

function WorkSlide({ slide }: SlideProps)
{
    const parentRef = useRef<HTMLDivElement | null>(null);
    const [widthCoef, setWidthCoef] = useState<number>(1);
    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            if (parentRef.current) {
                setWidthCoef(parentRef.current.offsetWidth / WIDTH_SLIDE);
            }
        });
        if (parentRef.current) {
            resizeObserver.observe(parentRef.current); 
        }
        return () => {
            resizeObserver.disconnect(); 
        };
    }, []);
    if (!slide) {
        return (
            <div className={styles.workArea}>
                <p>Нет слайда для отображения</p>
            </div>
        );
    }
    const backgroundStyle = slide.background.type === 'solid'
        ? { backgroundColor: slide.background.color }
        : { backgroundImage: `url(${slide.background.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }; 
    return (
        <div 
            ref={parentRef} 
            className={styles.workSlide}
            style={backgroundStyle}
        >
            {slide.objects.map(object => (
                (object.type == 'text')
                    ? <TextObject key={object.uid} object={object} widthCoef={widthCoef}/>
                    : <ImageObject key={object.uid} object={object} widthCoef={widthCoef}/>
            ))}
            <Selection slide={slide} widthCoef={widthCoef}/>
        </div>
    )
}

export default WorkSlide