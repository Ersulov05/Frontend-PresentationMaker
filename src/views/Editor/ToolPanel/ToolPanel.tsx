import { Button } from '../../../components/button/Button'
import { Icon } from '../../../components/icon/Icon'
import { Text } from '../../../components/text/Text'
import { Strip } from '../../../components/strip/Strip'
import { useAppActions } from '../../hooks/useAppActions'

import { TextDataType } from '../../../store/objects/addTextToSlide'
import React, { forwardRef, useEffect, useRef } from 'react'
import { HistoryContext } from '../../hooks/historyContext'
import { useToolContext } from '../../context/toolContext'
import useAppSelector from '../../hooks/useAppSelector'
import { PreviewSlide } from '../ListSlides/PreviewSlide/PreviewSlide'
import { useGeneratePDF } from '../../hooks/useGeneratePDF'
import { FileInput } from '../../../components/fileInput/fileInput'
import { ButtonWithChild } from '../../../components/buttonWithChild/ButtonWithChild'
import styles from './ToolPanel.module.css'
import { ButtonWithList } from '../../../components/buttonWithList/ButtonWithList'

type ToolPanelProps = {
    onGeneratePDF: () => void
}

function ToolPanel({
    onGeneratePDF
}: ToolPanelProps) 
{
    const { 
        addSlide,
        deleteSlides, 
        deleteObjects,
        addTextObject,
        setEditor,
        importPresentationFromJSON,
        exportPresentationToJSON,
    } = useAppActions()
    
    const presentation = useAppSelector(editor => editor.presentation)

    function onAddTextToSlide() {
        const data: TextDataType = {
            position: {
                x: 10,
                y: 10,
            },
            size: {
                width: 100,
                height: 100,
            }
        }
        addTextObject(data)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        if ((isMac ? event.metaKey : event.ctrlKey) && event.key === 'z') {
            onUndo()
        } else if ((isMac ? event.metaKey : event.ctrlKey) && event.key === 'y') {
            onRedo()
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [])

    const history = React.useContext(HistoryContext)

    function onUndo() {
        const newEditor = history.undo()
        if (newEditor) {
            setEditor(newEditor)
        }
    }

    function onRedo() {
        const newEditor = history.redo()
        if (newEditor) {
            setEditor(newEditor)
        }
    }
    const { togglePopup, togglePresentationPreview } = useToolContext() || {};

    function changeFontSize() {
        const newSize = prompt("Введите размер шрифта (например, '24px'):", "24px");
        if (newSize) {
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const selectedContents = range.cloneContents(); // Клонируем выделенный текст
                const elements = selectedContents.childNodes;
                console.log("clon: ", elements)

                for (let i = 0; i < elements.length; i++) {
                    const element = elements[i];
                    console.log(element); 
                }
    
                // Создаём новый элемент <span> с нужным размером шрифта
                const span = document.createElement('span');
                span.style.fontSize = newSize; // Устанавливаем новый размер шрифта
                
                // Удаляем старое содержимое
                range.deleteContents();
                
                // Оборачиваем все выделенные узлы в новый <span>
                const fragment = document.createDocumentFragment();
                fragment.appendChild(span);
                span.appendChild(selectedContents); // Добавляем клонированное содержимое в <span>
                
                range.insertNode(fragment); // Вставляем новый фрагмент в документ
            }
        }
    }

    const fonts = [
        "Arial",
        "Times New Roman",
        "Georgia",
        "Verdana",
        "Jersey 15",
        "Comic Sans MS",
    ]

    return (
        <>
            <div className={styles.container}>
                <div className={styles.toolPanel}>
                    <div className={styles.slideButtonsContainer}>
                        <Button 
                            onClick={addSlide}
                            className={styles.addSlideButton}
                        >
                            <Icon iconSrc={"/image/iconPlus.svg"} size={30}/>
                        </Button>
                        <Button 
                            onClick={addSlide}
                            className={styles.addSlideButton}
                        >
                            <Icon iconSrc={"/image/iconCopySlide.svg"} size={30}/>
                        </Button>
                        <Button 
                            onClick={deleteSlides}
                            className={styles.addSlideButton}
                            border={3}
                        >
                            <Icon iconSrc={"/image/iconDelete.svg"} size={22}/>
                        </Button>
                        <Button 
                            onClick={onAddTextToSlide}
                            className={styles.addSlideButton}
                        >
                            <Text>Тemplate</Text>
                        </Button>
                    </div>
                    <Strip orientation={"vertical"}/>
                    <div className={styles.undoRedoContainer}>
                        <Button 
                            onClick={onUndo}
                            className={styles.addSlideButton}
                            border={5}
                        >
                            <Icon iconSrc={"/image/iconUndoRedo.svg"} size={20}/>
                        </Button>
                        <Button 
                            onClick={onRedo}
                            className={styles.addSlideButton}
                            border={5}
                        >
                            <Icon iconSrc={"/image/iconUndoRedo.svg"} size={20} style={{transform: "scale(-1, 1)"}}/>
                        </Button>
                    </div>
                    <Strip orientation={"vertical"}/>
                    <div className={styles.objectButtonsContainer}>
                        <Button 
                            onClick={onAddTextToSlide}
                            className={styles.toolButton}
                        >
                            <Text>Т</Text>
                        </Button>
                        <Button 
                            onClick={togglePopup}
                            className={styles.addSlideButton}
                        >
                            <Icon iconSrc={"/image/iconImage.svg"} size={30} className={styles.iconPlus}/>
                        </Button>
                        <Button 
                            id={"deleteObjectButton"}
                            onClick={deleteObjects}
                            className={styles.addSlideButton}
                            border={3}
                        >
                            <Icon iconSrc={"/image/iconDelete.svg"} size={22}/>
                        </Button>
                        <Button 
                            onClick={onAddTextToSlide}
                            className={styles.addSlideButton}
                        >
                            <Text>Scale</Text>
                        </Button>
                        <ButtonWithList
                            value={"Generate PDF"}
                            onClick={onGeneratePDF}
                        >
                            <Button
                                style={{width: "100%"}} 
                                border={10}
                                onClick={togglePresentationPreview}
                            >
                                Preview
                            </Button>
                        </ButtonWithList>
                        
                        <FileInput
                            id={"importPresentationFromJSON"}
                            onChange={importPresentationFromJSON}
                        />
                        
                        <Button onClick={() => {document.getElementById('importPresentationFromJSON')?.click()}}>Import</Button>
                        <Button onClick={() => exportPresentationToJSON(presentation)}>Export</Button>
                    </div>
                    <Strip orientation={"vertical"}/>
                    <div className={styles.editButtonsContainer}>
                        <Button id={"boldButton"} onClick={() => document.execCommand('bold')} border={5}>B</Button>
                        <Button id={"italicButton"} onClick={() => document.execCommand('italic')} border={5}>Курсив</Button>
                        <Button id={"strikeThroughButton"} onClick={() => document.execCommand('strikeThrough')} border={5}>Зачеркнутый</Button>
                        <Button id={"changeSizeButton"} onClick={() => changeFontSize()} border={5}>Другой кегль</Button>
                        <ButtonWithChild 
                            value='font-family' 
                            id={"fontFamilyContainer"}
                            className={styles.buttonWithList}
                            valueLocationHorizontal={'center'}
                        >
                            <div className={styles.buttonFamilyContainer}>
                                {fonts.map(font => (
                                    <Button 
                                        key={font}
                                        className='buttonFamily'
                                        style={{width: "100%"}} 
                                        border={10}
                                        onClick={() => changeFont(font)}
                                    >
                                        {font}
                                    </Button>
                                ))}
                            </div>
                        </ButtonWithChild>
                    </div>
                </div>
            </div>
        </>
    )
}

function changeFont(fontName: string) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedContents = range.cloneContents()

    const parentSpan = range.startContainer.parentNode as HTMLElement;
    console.log(selectedContents)

    if (parentSpan.tagName === 'SPAN' && parentSpan.style.fontFamily === fontName) {
        parentSpan.style.fontFamily = fontName
    } else {
        const span = document.createElement('span')
        span.style.fontFamily = `'${fontName}'`

        range.deleteContents()
        
        span.appendChild(selectedContents)
        range.insertNode(span)
    }
}

export {
    ToolPanel,
}