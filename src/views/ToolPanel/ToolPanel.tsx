import { Button } from '../../components/button/Button'
import { Icon } from '../../components/icon/Icon'
import { Text } from '../../components/text/Text'
import { Strip } from '../../components/strip/Strip'
import { useAppActions } from '../hooks/useAppActions'
import styles from './ToolPanel.module.css'
import { ImageDataType } from '../../store/objects/addImageToSlide'
import { TextDataType } from '../../store/objects/addTextToSlide'
import React, { forwardRef, useEffect, useRef } from 'react'
import { HistoryContext } from '../hooks/historyContext'
import { useToolContext } from '../context/toolContext'
import useAppSelector from '../hooks/useAppSelector'
import { PreviewSlide } from '../ListSlides/PreviewSlide/PreviewSlide'
import { useGeneratePDF } from '../hooks/useGeneratePDF'

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
        addImageObject,
        addTextObject,
        setEditor,
    } = useAppActions()
    
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

    function onAddImageToSlide() {
        const data: ImageDataType = {
            position: {
                x: 10,
                y: 10,
            },
            size: {
                width: 100,
                height: 100,
            },
            src: '/image/react.svg'
        }
        addImageObject(data)
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
                    </div>
                </div>
            </div>
            <HiddenContainer ref={hiddenContainerRef}/>
        </>
    )
}

export {
    ToolPanel,
}