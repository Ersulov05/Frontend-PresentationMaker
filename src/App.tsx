import { dispatch, EditorType } from './store/editor.ts'
import { ListSlides } from './views/ListSlides/ListSlides.tsx';
import styles from './App.module.css';
import { WorkArea } from './views/WorkArea/WorkArea.tsx';
import { addSlide } from './store/addSlide.ts';
import { removeSlide } from './store/removeSlide.ts';
import { TextField } from './components/textField/TextField.tsx';
import { renamePresentation } from './store/renamePresentation.ts';
import { addScale, changeScale, subScale } from './store/changeScale.ts';
import { NumberField } from './components/numberField/NumberField.tsx';
import { BackgroundType } from './store/PresentationType.ts';
import { BackgroundDataType, changeBackgroundSlide } from './store/changeBackgroundSlide.ts';
import { addTextToSlide, TextDataType } from './store/addTextToSlide.ts';
import { deleteObject } from './store/deleteObject.ts';
import { addImageToSlide, ImageDataType } from './store/addImageToSlide.ts';
import { useState } from 'react';
import { saveEditorToFile } from './services/saveFile.ts';
import { loadEditorFromFile } from './services/loadFile.ts';
import { useAppSelector } from './store/reducers/reducers.ts';

// type AppProps = {
//     editor: EditorType; // Определяем тип для пропсов
// }

function App() {
    // const { presentation } = editor;
    const slidesState = useAppSelector(state => state.slides)
    const scale = useAppSelector(state => state.scale)
    const colors = useAppSelector(state => state.colors)
    const name = useAppSelector(state => state.title)
    const slides = slidesState.slides
    const selectedSlideIds = slidesState.selectedSlideIds

    const [ tempBackground, setTempBackground ] = useState<BackgroundType | null>(null)
    function onRenamePresentation(name: string) {
        dispatch(renamePresentation, name)
    }

    function onAddSlide() {
        dispatch(addSlide)
    }

    function onRemoveSlide() {
        dispatch(removeSlide)
    }

    function onAddScale() {
        dispatch(addScale)
    }

    function onSubScale() {
        dispatch(subScale)
    }

    function onChangeScale(newScale: number) {
        dispatch(changeScale, newScale)
    }

    function onChangeBackgroundSlide() {
        const data: BackgroundDataType = {
            background: {
                color: "#888888",
                type: "solid",
            },
        }
        dispatch(changeBackgroundSlide, data)
    }

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
        dispatch(addTextToSlide, data)
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
        dispatch(addImageToSlide, data)
    }

    function onDeleteObject() {
        dispatch(deleteObject)
    }

    const selectedSlide = slides.find(slide => slide.uid === selectedSlideIds[0]);

    return (
        <>
            <header className={styles.header}>
                <h1>{name}</h1>
                <TextField 
                    value={name}
                    onChange={(value) => onRenamePresentation(value)}
                />

                <input  
                    type="file"
                    accept=".json"
                    onChange={loadEditorFromFile}
                    style={{ marginBottom: '20px' }}
                />
                <button onClick={() => saveEditorToFile("data")} style={{ marginBottom: '20px' }}>
                    Save
                </button>
                <button onClick={onAddSlide} style={{ marginBottom: '20px' }}>
                    Add Slide
                </button>
                <button onClick={onRemoveSlide} style={{ marginBottom: '20px' }}>
                    Remove Slide
                </button>
                <button onClick={onAddScale} style={{ marginBottom: '20px' }}>
                    Add Scale
                </button>
                <button onClick={onSubScale} style={{ marginBottom: '20px' }}>
                    Sub Scale
                </button>
                <button onClick={onChangeBackgroundSlide} style={{ marginBottom: '20px' }}>
                    change background
                </button>
                <button onClick={onAddTextToSlide} style={{ marginBottom: '20px' }}>
                    add Text
                </button>
                <button onClick={onAddImageToSlide} style={{ marginBottom: '20px' }}>
                    add Image
                </button>
                <button onClick={onDeleteObject} style={{ marginBottom: '20px' }}>
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
                    onChange={(value) => onChangeScale(value)} 
                    isFloat={true}
                    limit={{
                        minValue: 0.5,
                        maxValue: 2
                    }}
                />
            </header>
            <main
                className={styles.main}
            >
                <ListSlides 
                    slides={ slides }
                    selectedSlideIds={ selectedSlideIds }
                    tempBackground={ tempBackground }
                />
                <WorkArea 
                    slide={selectedSlide} 
                    scale={scale}
                    colors={colors}
                    onGetTempBackground={setTempBackground}
                    tempBackground={tempBackground}
                />
            </main>
            <footer className={styles.footer}>

            </footer>
        </>
    )
}

export default App
