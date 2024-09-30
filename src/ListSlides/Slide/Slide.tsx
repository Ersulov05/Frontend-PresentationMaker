// import React from 'react'
import { usePresentation } from '../../PresentationContext.tsx'
import { Slide as SlideType } from '../../Presentation.ts'; // Импортируйте тип Slide
import styles from './Slide.module.css';

interface SlideProps {
    slide: SlideType; // Пропсы, ожидающие объект слайда
}



function Slide({ slide }: SlideProps)
{
    const { presentation, selectSlide } = usePresentation();
    const isSelected = presentation.selectedSlideIds.includes(slide.uid);

    // const { presentation, setPresentation } = usePresentation();
    return (
        <div 
            className={`${styles.slide} ${isSelected ? styles.slideSelected : ''}`}
            onClick={() => selectSlide(slide.uid)}
        >
            {slide.uid}
        </div>
    )
}

export default Slide