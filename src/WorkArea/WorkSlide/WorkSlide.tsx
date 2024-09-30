// import React from 'react'
import { usePresentation } from '../../PresentationContext.tsx'
import { Slide as SlideType } from '../../Presentation.ts'; // Импортируйте тип Slide
import styles from './WorkSlide.module.css';
import TextObject from './Objects/TextObject.tsx';
import ImageObject from './Objects/ImageObject.tsx';

interface SlideProps {
    slide?: SlideType; // Пропсы, ожидающие объект слайда
}

function WorkSlide({ slide }: SlideProps)
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
        <div className={styles.workSlide}>
            {slide.objects.map(object => (
                (object.type == 'text')
                    ? <TextObject key={object.uid} object={object}/>
                    : <ImageObject key={object.uid} object={object}/>
            ))}
        </div>
    )
}

export default WorkSlide