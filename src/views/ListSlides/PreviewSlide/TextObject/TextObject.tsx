import { useRef } from 'react';
import { ObjectTextType as ObjectType } from '../../../../store/PresentationType.ts';
import styles from './TextObject.module.css';

interface ObjectProps {
    object: ObjectType;
    widthCoef: number;
}

function TextObject({ object, widthCoef}: ObjectProps)
{
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        
        <div className={styles.textArea} 
            style={{
                top: `${object.pos.y*widthCoef}px`,
                left: `${object.pos.x*widthCoef}px`,
                width: `${object.size.width}px`,
                height: `${object.size.height}px`,
                background: object.backgroundColor,
                color: object.color,
                fontFamily: object.font.family, 
                fontWeight: object.font.weight,  
                transform: `scale(${widthCoef})`,
                transformOrigin: "top left",
                // transform: `rotateZ(${45}deg)`,
                //fontSize: `${object.font.size}px`, //Влияет на высоту блока
                // lineHeight: `${object.font.lineHeight}px` 
            }}
        >
            <div 
                className={styles.rotateContainer}
                style={{transform: `rotateZ(${object.rotation}deg)`}}
            >
                <div 
                    ref={containerRef} 
                    className={styles.text} 
                    dangerouslySetInnerHTML={{ __html: object.value}}
                ></div>
            </div>
        </div>
    )
}

export default TextObject