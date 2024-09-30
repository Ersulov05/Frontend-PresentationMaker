// import React from 'react'
import { usePresentation } from '../../../PresentationContext.tsx'
import { ObjectImage as ObjectType } from '../../../Presentation.ts'; // Импортируйте тип Slide
import styles from './ImageObject.module.css';

interface ObjectProps {
    object: ObjectType; // Пропсы, ожидающие объект слайда
}

function ImageObject({ object }: ObjectProps)
{
    // const { presentation } = usePresentation();
    // const { presentation, setPresentation } = usePresentation();
    return (
        <img className={styles.image} 
            src={object.src}
            style={{
                top: `${object.pos.y}px`,
                left: `${object.pos.x}px`,
                width: `${object.size.width}px`,
                height: `${object.size.height}px`,
            }}
        />
    )
}

export default ImageObject