import React from 'react'
import { NumberField } from '../../components/numberField/NumberField'
import { TextField } from '../../components/textField/TextField'
import { ImageDataType } from '../../store/objects/addImageToSlide'
import { TextDataType } from '../../store/objects/addTextToSlide'
import { useAppActions } from '../hooks/useAppActions'
import useAppSelector from '../hooks/useAppSelector'
import styles from './topPanel.module.css'
import { HistoryContext } from '../hooks/historyContext'

function TopPanel() {
    const scale = useAppSelector(editor => editor.presentation.scale)
    const name = useAppSelector(editor => editor.presentation.name)

    const { 
        addSlide,
        deleteSlides, 
        deleteObjects,
        addImageObject,
        addTextObject,
        renamePresentation,
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

    return (
        <header className={styles.header}>
            <h1>{name}</h1>
            <TextField 
                value={name}
                onChange={(value) => renamePresentation(value)}
            />

            {/* <input  
                type="file"
                accept=".json"
                onChange={loadEditorFromFile}
                style={{ marginBottom: '20px' }}
            /> */}
            {/* <button onClick={() => saveEditorToFile("data")} style={{ marginBottom: '20px' }}>
                Save
            </button> */}

            <button onClick={onUndo} style={{ marginBottom: '20px' }}>
                Undo
            </button>
            <button onClick={onRedo} style={{ marginBottom: '20px' }}>
                Redo
            </button>
            <button onClick={addSlide} style={{ marginBottom: '20px' }}>
                Add Slide
            </button>
            <button onClick={deleteSlides} style={{ marginBottom: '20px' }}>
                Remove Slide
            </button>
            {/* <button onClick={addScale} style={{ marginBottom: '20px' }}>
                Add Scale
            </button>
            <button onClick={subScale} style={{ marginBottom: '20px' }}>
                Sub Scale
            </button> */}
            <button onClick={onAddTextToSlide} style={{ marginBottom: '20px' }}>
                add Text
            </button>
            <button onClick={onAddImageToSlide} style={{ marginBottom: '20px' }}>
                add Image
            </button>
            <button onClick={deleteObjects} style={{ marginBottom: '20px' }}>
                delete Object
            </button>
            {/* <Button 
                value='button' 
                onClick={() => console.log('click')}
                isClickToFix={true}
            >
                <ListActions components={components} />
            </Button> */}
            
            <NumberField 
                value={scale.toString()} 
                // onChange={(value) => changeScale(value)} 
                isFloat={true}
                limit={{
                    minValue: 0.5,
                    maxValue: 2
                }}
            />
        </header>
    )
}

export {
    TopPanel
}