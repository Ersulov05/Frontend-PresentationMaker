import { joinStyles } from '../../../../../store/utils/joinStyles.ts';
import { ObjectTextType as ObjectType } from '../../../../../store/PresentationType.ts';
import styles from './TextObject.module.css';
import { useAppActions } from '../../../../hooks/useAppActions.ts';
import useAppSelector from '../../../../hooks/useAppSelector.ts';
import { CSSProperties, useLayoutEffect, useRef } from 'react';
import { useClickOutside } from '../../../../hooks/useClickOutside.tsx';

interface ObjectProps {
    object: ObjectType
    scale: number
    selected?: boolean
    onSetEdited?: (objectUid: string) => void
    edited?: boolean
}

function TextObject({ 
    object, 
    scale = 1,
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
        deleteObjectSelection,
    } = useAppActions()
    const selectedObjectIds = useAppSelector(editor => editor.selection.selectedObjectIds)
    const isSelected = selectedObjectIds.includes(object.uid)

    const textAreaRef = useRef<HTMLDivElement>(null)
    const textValue = useRef<string>(object.value)
    function handleBlur() {
        if (!isSelected) {
           return
        }
        if (object.value !== textValue.current) {
            changeTextObject(
                    {
                        ...object,
                        value: textValue.current
                    }
                )
            textValue.current = object.value
        }
        if (!keys.has('ctrl')) {
            deleteObjectSelection()
        }
    }

    useClickOutside({
        onClickOutside: isSelected ? handleBlur : undefined,
        ignoreRefs: [textAreaRef],
        ignoreClasses: ["textAreaSelect"],
        ignoreIds: [
            "boldButton", "italicButton", "strikeThroughButton", "ChangeTextStyleButtons",
            "changeSizeButton", "objectSelection", "fontFamilyContainer", "deleteObjectButton"
        ]
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
        <div className={joinStyles(
                styles.textArea, 
                isSelected && selected 
                    ? styles.select 
                    : '', 
                isSelected && "textAreaSelect"
            )} 
            onClick={handleClick}
            style={{
                top: `${(object.pos.y)*scale}px`,
                left: `${(object.pos.x)*scale}px`,
                width: `${object.size.width}px`,
                height: `${object.size.height}px`,
                background: object.backgroundColor.type === "solid"
                    ? object.backgroundColor.color
                    : `linear-gradient(${object.backgroundColor.angle}deg, ${object.backgroundColor.colors.join(', ')})`,
                fontFamily: object.font.family, 
                fontWeight: object.font.weight,  
                fontSize: `${object.font.size}px`,  
                //lineHeight: `${object.font.lineHeight*scale}px` 
            }}
        >
            {edited 
                ? <div 
                    ref={textAreaRef}
                    className={styles.text} 
                    style={textColorStyles}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    dangerouslySetInnerHTML={{ __html: object.value }}
                    onKeyDown={handleKeyDown}
                    onInput={(event) => {
                        textValue.current = event.currentTarget.innerHTML
                    }}
                />
                : <div 
                    style={textColorStyles}
                    className={styles.text} 
                    dangerouslySetInnerHTML={{ __html: object.value }}
                ></div>
            }
        </div>
    )
}

export default TextObject