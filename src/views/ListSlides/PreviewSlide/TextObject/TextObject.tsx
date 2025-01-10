import { useRef } from 'react';
import { ObjectTextType as ObjectType } from '../../../../store/PresentationType.ts';
import styles from './TextObject.module.css';

interface ObjectProps {
    object: ObjectType;
    widthCoef: number;
}

function TextObject({ object, widthCoef}: ObjectProps)
{
    const containerRef = useRef<HTMLDivElement>(null); // Указываем тип для useRef

    function getEditedText(text: string): string {

        // console.log("text ", text)
        const container = document.createElement('div');
        container.innerHTML = text
        container.style.display = 'none'
        document.body.appendChild(container)
        const elements = container.querySelectorAll<HTMLElement>('*')

        elements.forEach(element => {
            const computedStyle = window.getComputedStyle(element)
            // console.log(element)
            // console.log(computedStyle)
            const currentFontSize = computedStyle.fontSize
            // console.log("size", currentFontSize)
            const numericFontSize = parseFloat(currentFontSize)
            // console.log(numericFontSize)
            const newFontSize = numericFontSize * widthCoef
            element.style.fontSize = `${newFontSize}px`
        })
        document.body.removeChild(container);
        return container.innerHTML
    }

    // console.log(getEditedText(object.value))

    return (
        <div className={styles.textArea} 
            style={{
                top: `${object.pos.y*widthCoef}px`,
                left: `${object.pos.x*widthCoef}px`,
                width: `${object.size.width*widthCoef}px`,
                height: `${object.size.height*widthCoef}px`,
                background: object.backgroundColor,
                color: object.color,
                fontFamily: object.font.family, 
                fontWeight: object.font.weight,  
                fontSize: `${object.font.size*widthCoef}px`, 
                // fontSize: '0.155em',
                lineHeight: `${object.font.lineHeight*widthCoef}px` 
            }}>
            <div ref={containerRef} className={styles.text} dangerouslySetInnerHTML={{ __html: getEditedText(object.value) }}></div>
        </div>
    )
}

export default TextObject