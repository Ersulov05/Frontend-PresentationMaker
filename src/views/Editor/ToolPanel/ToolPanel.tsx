import { Button } from '../../../components/button/Button'
import { Icon } from '../../../components/icon/Icon'
import { Text } from '../../../components/text/Text'
import { Strip } from '../../../components/strip/Strip'
import { useAppActions } from '../../hooks/useAppActions'

import React, { useEffect } from 'react'
import { HistoryContext } from '../../hooks/historyContext'
import { useToolContext } from '../../context/toolContext'
import useAppSelector from '../../hooks/useAppSelector'
import { FileInput } from '../../../components/fileInput/fileInput'
import { ButtonWithChild } from '../../../components/buttonWithChild/ButtonWithChild'
import styles from './ToolPanel.module.css'
import { ButtonWithList } from '../../../components/buttonWithList/ButtonWithList'
import { changeFont } from '../../../store/utils/textChangeStyle'
import { Gradient, ObjectTextType, SlideType, Solid } from '../../../store/PresentationType'
import { NumberField } from '../../../components/numberField/NumberField'
import { ListChooseColor } from '../ListChooseColor/ListChooseColor'

type ToolPanelProps = {
    onGeneratePDF: () => void
    selectedSlide?: SlideType
}

type ImportExportButtonsProps = {
    onGeneratePDF: () => void
}

function ToolPanel({
    onGeneratePDF,
    selectedSlide
}: ToolPanelProps) 
{
    const { 
        addSlide,
        deleteSlides, 
        deleteObjects,
        addTextObject,
        setEditor,
    } = useAppActions()

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
    const selectedObjectIds = useAppSelector(editor => editor.selection.selectedObjectIds)
    const selectedObject = selectedSlide?.objects.find(object => object.uid === selectedObjectIds[0])
    const viewChangeTextStyle = selectedObject?.type === "text" ? true : false

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
                            onClick={() => {}}
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
                            onClick={addTextObject}
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
                    </div>
                    <Strip orientation={"vertical"}/>
                    <ImportExportButtons onGeneratePDF={onGeneratePDF}/>
                    {viewChangeTextStyle && selectedObject?.type === "text" && (
                        <>
                            <Strip orientation={"vertical"}/>
                            <ChangeTextStyleButtons selectedObject={selectedObject}/>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}


function ImportExportButtons({
    onGeneratePDF
}: ImportExportButtonsProps) {
    const { togglePresentationPreview } = useToolContext() || {};

    const { 
        importPresentationFromJSON,
        exportPresentationToJSON,
    } = useAppActions()
    const presentation = useAppSelector(editor => editor.presentation)

    return (
        <div className={styles.importExportContainer}>
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
    )
}

function ChangeTextStyleButtons({
    selectedObject
}: {selectedObject: ObjectTextType}) {
    const fonts = [
        "Arial",
        "Times New Roman",
        "Georgia",
        "Verdana",
        "Jersey 15",
        "Comic Sans MS",
    ]

    const { 
        changeTextObject,
    } = useAppActions()

    function handleChangeSize(size: number) {
        if (size < 5) return
        changeTextObject(
            {
                ...selectedObject,
                font: {
                    ...selectedObject.font,
                    size: size
                }
            }
        )
    }
    const colors = useAppSelector(editor => editor.colors)
    function onGetTextColor(color: Solid | Gradient) {
        changeTextObject(
            {
                ...selectedObject,
                color: color
            }
        )
    }

    function onGetTextBackgroundColor(color: Solid | Gradient) {
        changeTextObject(
            {
                ...selectedObject,
                backgroundColor: color
            }
        )
    }

    return (
        <div className={styles.editButtonsContainer} id={"ChangeTextStyleButtons"}>
            <Button id={"boldButton"} onClick={() => document.execCommand('bold')} border={5}>B</Button>
            <Button id={"italicButton"} onClick={() => document.execCommand('italic')} border={5}>Курсив</Button>
            <Button id={"strikeThroughButton"} onClick={() => document.execCommand('strikeThrough')} border={5}>Зачеркнутый</Button>
            <NumberField
                className={styles.sizeField}
                limit={{
                    minValue: 1,
                    maxValue: 200
                }}
                value={selectedObject.font.size.toString()}
                onChange={handleChangeSize}
            />
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
            <ButtonWithChild
                className={styles.popupButton} 
                value='color'
                isClickChildClose={false}
            >
                <ListChooseColor 
                    colors={colors} 
                    onGetColor={(color) => onGetTextColor(color)}
                />
            </ButtonWithChild>
            <ButtonWithChild
                className={styles.popupButton} 
                value='color'
                isClickChildClose={false}
            >
                <ListChooseColor 
                    colors={colors} 
                    onGetColor={(color) => onGetTextBackgroundColor(color)}
                />
            </ButtonWithChild>
        </div>
    )
}

export {
    ToolPanel,
}