import { CSSProperties, useRef } from 'react';
import { ObjectTextType as ObjectType } from '../../../../../store/PresentationType.ts';
import styles from './TextObject.module.css';

interface ObjectProps {
    object: ObjectType;
    widthCoef: number;
}

function TextObject({ object, widthCoef}: ObjectProps)
{
    const containerRef = useRef<HTMLDivElement>(null)

    const textColorStyles: CSSProperties =  object.color.type === "solid" 
        ? {
            color: object.color.color,
            caretColor: object.color.color
        }
        : {
            backgroundImage: `linear-gradient(${object.color.angle}deg, ${object.color.colors.join(', ')})`,
            color: 'transparent',
            caretColor: 'black'
        }

    return (
        <div style={{
            position: "absolute",
            transform: `scale(${widthCoef})`,
            transformOrigin: "top left",
            top: `${object.pos.y*widthCoef}px`,
            left: `${object.pos.x*widthCoef}px`,
            width: `${object.size.width}px`,
            height: `${object.size.height}px`,
        }}>
            <div className={styles.textArea} 
                style={{
                    width: "100%",
                    height: "100%",
                    transform: `rotateZ(${object.rotation}rad)`,
                    background: object.backgroundColor.type === "solid"
                        ? object.backgroundColor.color
                        : `linear-gradient(${object.backgroundColor.angle}deg, ${object.backgroundColor.colors.join(', ')})`,
                    fontFamily: object.font.family, 
                    fontWeight: object.font.weight,  
                    
                    fontSize: `${object.font.size}px`,
                    
                    // lineHeight: `${object.font.lineHeight}px` 
                }}>
                <div 
                    style={{
                        ...textColorStyles,
                    }}
                    ref={containerRef} 
                    className={styles.text} 
                    dangerouslySetInnerHTML={{ __html: object.value}}
                ></div>
            </div>
        </div>
        
    )
}

export default TextObject