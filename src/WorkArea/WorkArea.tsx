// import React from 'react'
import { usePresentation } from '../PresentationContext.tsx'
import { Slide as SlideType } from '../Presentation.ts'; // Импортируйте тип Slide
import styles from './WorkArea.module.css';
import WorkSlide from './WorkSlide/WorkSlide.tsx';

interface SlideProps {
    slide?: SlideType; // Пропсы, ожидающие объект слайда
}

function WorkArea({ slide }: SlideProps)
{
    // const { presentation } = usePresentation();
    // const { presentation, setPresentation } = usePresentation();
    if (!slide) {
        return (
            <div className={styles.workArea}>
                <p>Нет слайда для отображения</p>
            </div>
        );
    }
    return (
        <div className={styles.workAreaContainer}>
            <div className={styles.workArea}>
                <WorkSlide slide={slide}/>
            </div>
        </div>
    )
}

export default WorkArea