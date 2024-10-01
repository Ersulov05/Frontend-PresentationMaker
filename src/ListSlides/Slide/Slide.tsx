import { useRef, useEffect, useState } from 'react';
import { usePresentation } from '../../PresentationContext.tsx'
import { Slide as SlideType } from '../../Presentation.ts'; 
import styles from './Slide.module.css';
import {WIDTH_SLIDE} from '../../constants.ts'
import TextObject from '../../components/objects/TextObject.tsx';
import ImageObject from '../../components/objects/ImageObject.tsx';

interface SlideProps {
    slide: SlideType;
}



function Slide({ slide }: SlideProps)
{
    const { presentation, selectSlide } = usePresentation();
    const isSelected = presentation.selectedSlideIds.includes(slide.uid);
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
    return (
        <div ref={parentRef} 
            className={`${styles.slide} ${isSelected ? styles.slideSelected : ''}`}
            onClick={() => selectSlide(slide.uid)}
        >
            {slide.objects.map(object => (
                (object.type == 'text')
                    ? <TextObject key={object.uid} object={object} widthCoef={widthCoef}/>
                    : <ImageObject key={object.uid} object={object} widthCoef={widthCoef}/>
            ))}
        </div>
    )
}

export default Slide