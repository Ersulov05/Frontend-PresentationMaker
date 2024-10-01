// import React from 'react'
import { usePresentation } from '../PresentationContext.tsx'
import Slide from './Slide/Slide.tsx';
import styles from './Slides.module.css';
function Slides()
{
    const { presentation } = usePresentation();
    return (
        <div
            className={styles.slides}
        >
            {presentation.slides.map(slide => (
                <Slide key={slide.uid} slide={slide} />
            ))}
        </div>
    )
}

export default Slides