import { Button } from '../../components/button/Button'
import { Icon } from '../../components/icon/Icon'
import { Text } from '../../components/text/Text'
import { Strip } from '../../components/strip/Strip'
import { useAppActions } from '../hooks/useAppActions'
import styles from './ToolPanel.module.css'
import { TextDataType } from '../../store/objects/addTextToSlide'
import React, { forwardRef, useEffect, useRef } from 'react'
import { HistoryContext } from '../hooks/historyContext'
import { useToolContext } from '../context/toolContext'
import useAppSelector from '../hooks/useAppSelector'
import { PreviewSlide } from '../ListSlides/PreviewSlide/PreviewSlide'
import { useGeneratePDF } from '../hooks/useGeneratePDF'
import { FileInput } from '../../components/fileInput/fileInput'

type ToolPanelProps = {
    setOpenedSidePopap?: () => void
}

const HiddenContainer = forwardRef<HTMLDivElement>((_, ref) => {
    const slides = useAppSelector(editor => editor.presentation.slides);

    return (
        <div 
            className={styles.hiddenContainer}
            ref={ref}
        >
            {slides.map(slide => (
                <PreviewSlide slide={slide} key={'hidden' + slide.uid} />
            ))}
        </div>
    );
});

function ToolPanel({}: ToolPanelProps) 
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
    const { togglePopup } = useToolContext() || {};

    const { generatePDFs, status } = useGeneratePDF();

    const handleGeneratePDF = async () => {
        await generatePDFs(hiddenContainerRef);
        if (status) {
            console.log("PDF успешно создан!");
        } else {
            console.log("Произошла ошибка при создании PDF.");
        }
    };

    const hiddenContainerRef = useRef<HTMLDivElement>(null)


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
                        <Button onClick={handleGeneratePDF}>Generate PDF</Button>
                        
                        <FileInput
                            id={"importPresentationFromJSON"}
                            onChange={importPresentationFromJSON}
                        />
                        
                        <Button onClick={() => {document.getElementById('importPresentationFromJSON')?.click()}}>Import</Button>
                        <Button onClick={() => exportPresentationToJSON(presentation)}>Export</Button>
                    </div>
                    <div className={styles.editButtonsContainer}>
                        <Button id={"boldButton"} onClick={toggleBold} border={5}>B</Button>
                        <button 
                            id="italicButton"
                            onClick={() => document.execCommand('italic')}>Курсив</button>
                        <button 
                            id="strikeThroughButton"
                            onClick={() => document.execCommand('strikeThrough')}>Зачеркнутый</button>
                        <button onClick={() => changeFontSize()}>Другой кегль</button>
                    </div>
                </div>
            </div>
            <HiddenContainer ref={hiddenContainerRef}/>
        </>
    )
}

function toggleBold() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedContents = range.cloneContents(); // Клонируем выделенный текст

    // Проверяем, обернут ли выделенный текст в <strong>
    let isBold = false;
    const tempDiv = document.createElement('div');
    tempDiv.appendChild(selectedContents);
    
    // Проверяем наличие тега <strong>
    const strongElements = tempDiv.querySelectorAll('strong');
    if (strongElements.length > 0) {
        isBold = true; // Если есть <strong>, значит текст уже жирный
    }

    // Создаем новый элемент <strong> или убираем его
    if (!isBold) {
        // Создаем новый элемент <strong>
        const strong = document.createElement('strong');
        strong.appendChild(selectedContents);

        // Удаляем старое содержимое и вставляем новый <strong>
        range.deleteContents(); 
        range.insertNode(strong);
        
        // Сбрасываем выделение
        selection.removeAllRanges();
        selection.addRange(range); // Восстанавливаем выделение
    } else {
        // Убираем <strong>, если текст уже жирный
        strongElements.forEach(strong => {
            const parent = strong.parentNode;
            if (parent) {
                while (strong.firstChild) {
                    parent.insertBefore(strong.firstChild, strong);
                }
                parent.removeChild(strong);
            }
        });
        
        // Сбрасываем выделение
        selection.removeAllRanges();
        selection.addRange(range); // Восстанавливаем выделение
    }
}


export {
    ToolPanel,
}