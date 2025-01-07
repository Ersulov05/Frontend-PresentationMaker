import { useEffect, useRef } from 'react';
import { ObjectTextType as ObjectType } from '../../../../store/PresentationType.ts';
import styles from './TextObject.module.css';

interface ObjectProps {
    object: ObjectType;
    widthCoef: number;
}

function TextObject({ object, widthCoef}: ObjectProps)
{

    const containerRef = useRef<HTMLDivElement>(null); // Указываем тип для useRef

    function setScale(element: HTMLElement) {
        const currentFontSize = window.getComputedStyle(element).fontSize;
        const newFontSize = parseFloat(currentFontSize) * widthCoef
        element.style.fontSize = `${newFontSize}px`;
    }

    function recursiveSetScale(element: HTMLElement) {
        setScale(element)
        const elements = element.querySelectorAll('*')
        elements.forEach(element => {
            recursiveSetScale(element as HTMLElement)
        })        
    }

    function getEditedText(text: string): string {
        const container = document.createElement('div');
        container.innerHTML = text;

        // Проходим по всем элементам внутри контейнера
        const elements = container.querySelectorAll<HTMLElement>('*');
        const scaleFactor = 2; // Коэффициент для умножения

        elements.forEach(element => {
            // console.log("+")
            const computedStyle = window.getComputedStyle(element);
            const currentFontSize = computedStyle.fontSize;
            console.log("size", currentFontSize)

            if (currentFontSize) {
                // Если стиль font-size уже установлен, умножаем его на коэффициент
                const numericFontSize = parseFloat(currentFontSize);
                // console.log(numericFontSize)
                const newFontSize = numericFontSize * scaleFactor;
                element.style.fontSize = `${newFontSize}px`;
            } else {
                // Если стиль не установлен, задаем его значение
                element.style.fontSize = `calc(1em * ${scaleFactor})`;
            }
        });
        return container.innerHTML
    }

    console.log(getEditedText(object.value))

    // useEffect(() => {
    //     if (containerRef.current) {
    //         // const elements = containerRef.current.querySelectorAll('*');
    //         recursiveSetScale(containerRef.current)
    //         // elements.forEach(element => {
    //         //     if (element instanceof HTMLElement) {
    //         //         const currentFontSize = window.getComputedStyle(element).fontSize;
    //         //         const newFontSize = parseFloat(currentFontSize) * widthCoef; // Умножаем на scale
    //         //         element.style.fontSize = `${newFontSize}px`; // Устанавливаем новый размер шрифта
    //         //     }
    //         // });
    //     }
    // }, [object.value, widthCoef]);


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
            <div ref={containerRef} className={styles.text} dangerouslySetInnerHTML={{ __html: object.value }}></div>
        </div>
    )
}

export default TextObject