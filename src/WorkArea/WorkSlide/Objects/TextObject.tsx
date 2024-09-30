// import React from 'react'
import { usePresentation } from '../../../PresentationContext.tsx'
import { ObjectText as ObjectType } from '../../../Presentation.ts'; // Импортируйте тип Slide
import styles from './TextObject.module.css';

interface ObjectProps {
    object: ObjectType; // Пропсы, ожидающие объект слайда
}

function TextObject({ object }: ObjectProps)
{
    // const { presentation } = usePresentation();
    // const { presentation, setPresentation } = usePresentation();
    return (
        <div className={styles.textArea} 
            style={{
                top: `${object.pos.y}px`,
                left: `${object.pos.x}px`,
                width: `${object.size.width}px`,
                height: `${object.size.height}px`,
                background: object.backgroundColor,
                color: object.color,
                fontFamily: object.font.family, 
                fontWeight: object.font.weight,  
                fontSize: `${object.font.size}px`,  
                lineHeight: `${object.font.lineHeight}px` 
            }}>
            <div className={styles.text}>{object.value}</div>
        </div>
    )
}

export default TextObject