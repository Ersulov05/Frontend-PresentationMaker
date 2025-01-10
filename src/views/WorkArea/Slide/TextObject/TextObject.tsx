import { joinStyles } from '../../../../store/utils/joinStyles.ts';
import { ObjectTextType as ObjectType } from '../../../../store/PresentationType.ts';
import styles from './TextObject.module.css';
import { useAppActions } from '../../../hooks/useAppActions.ts';
import useAppSelector from '../../../hooks/useAppSelector.ts';
import { useLayoutEffect, useRef } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside.tsx';

interface ObjectProps {
    object: ObjectType
    scale: number
    selected?: boolean
    onSetEdited?: (objectUid: string) => void
    edited?: boolean
}

function TextObject({ 
    object, 
    scale,
    selected = true,
    onSetEdited,
    edited,
}: ObjectProps) {
    const keys = useAppSelector(editor => editor.keys)

    function handleClick() {
        if (!edited) {
            if (onSetEdited) {
                onSetEdited(object.uid)
                return
            }
            if (keys.has('ctrl')) {
                addObjectToSelection(object.uid)
                return
            }
            selectObject(object.uid)
        }
    }

    const { 
        selectObject,
        addObjectToSelection,
        changeTextObject,
    } = useAppActions()
    const selectedObjectIds = useAppSelector(editor => editor.selection.selectedObjectIds)
    const isSelected = selectedObjectIds.includes(object.uid)

    // function changeFontSize() {
    //     const newSize = prompt("Введите размер шрифта (например, '24px'):", "24px");
    //     if (newSize) {
    //         const selection = window.getSelection();
    //         if (selection && selection.rangeCount > 0) {
    //             const range = selection.getRangeAt(0);
    //             const selectedContents = range.extractContents(); // Извлекаем выделенный текст
                
    //             const span = document.createElement('span');
    //             span.style.fontSize = newSize; // Устанавливаем размер шрифта
    //             span.appendChild(selectedContents); // Добавляем извлечённый текст в <span>
                
    //             range.insertNode(span); // Вставляем <span> обратно в документ
    //         }
    //     }
    // }

    const textAreaRef = useRef<HTMLDivElement>(null)
    const textValue = useRef<string>(object.value)
    function handleBlur() {
        if (!isSelected) {
           return
        }
        if (object.value !== textValue.current) {
            changeTextObject(textValue.current)
            textValue.current = object.value
        }
    }

    useClickOutside({
        onClickOutside: handleBlur,
        ignoreRefs: [textAreaRef],
        ignoreIds: ["boldButton", "italicButton", "strikeThroughButton", "changeSizeButton"]
    })

    useLayoutEffect(() => {
        textValue.current = object.value
    }, [object.value])

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            const selection = window.getSelection()
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0)
                const br = document.createElement('br')
                range.deleteContents()
                range.insertNode(br)
                range.collapse(false)
                selection.removeAllRanges()
                selection.addRange(range)
                if (textAreaRef.current) {
                    textValue.current = textAreaRef.current.innerHTML
                }       
            }
        }
    }

    return (
        <div className={joinStyles(styles.textArea, isSelected && selected ? styles.select : '')} 
            onClick={handleClick}
            style={{
                top: `${(object.pos.y)*scale}px`,
                left: `${(object.pos.x)*scale}px`,
                width: `${object.size.width*scale}px`,
                height: `${object.size.height*scale}px`,
                background: object.backgroundColor,
                color: object.color,
                fontFamily: object.font.family, 
                fontWeight: object.font.weight,  
                //fontSize: `${object.font.size*scale}px`,  
                //lineHeight: `${object.font.lineHeight*scale}px` 
            }}
        >
            {edited 
                ? <div 
                    ref={textAreaRef}
                    className={styles.text} 
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    dangerouslySetInnerHTML={{ __html: object.value }}
                    onKeyDown={handleKeyDown}
                    onInput={(event) => {
                        textValue.current = event.currentTarget.innerHTML
                    }}
                />
                : <div 
                    className={styles.text} 
                    dangerouslySetInnerHTML={{ __html: object.value }}
                ></div>
            }
        </div>
    )
}

export default TextObject