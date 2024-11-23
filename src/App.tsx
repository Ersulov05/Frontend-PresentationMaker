import { ListSlides } from './views/ListSlides/ListSlides.tsx';
import styles from './App.module.css';
import { WorkArea } from './views/WorkArea/WorkArea.tsx';
import { TextField } from './components/textField/TextField.tsx';
import { NumberField } from './components/numberField/NumberField.tsx';
import { BackgroundType } from './store/PresentationType.ts';
import { useState } from 'react';
import { saveEditorToFile } from './services/saveFile.ts';
import { loadEditorFromFile } from './services/loadFile.ts';
import { useAppActions, useAppSelector } from './store/reducers/reducers.ts';
import { TextDataType } from './store/objects/addTextToSlide.ts';
import { ImageDataType } from './store/objects/addImageToSlide.ts';

function App() {
    const { 
        addSlide, 
        deleteSlides, 
        renamePresentation,
        addScale,
        subScale,
        changeScale,
        deleteObjects,
        addImageObject,
        addTextObject,
    } = useAppActions()

    const slidesState = useAppSelector(state => state.slides)
    const scale = useAppSelector(state => state.scale)
    const colors = useAppSelector(state => state.colors)
    const name = useAppSelector(state => state.name)
    const slides = slidesState.slides
    const selectedSlideIds = slidesState.selectedSlideIds

    const [ tempBackground, setTempBackground ] = useState<BackgroundType | null>(null)

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

    const selectedSlide = slides.find(slide => slide.uid === selectedSlideIds[0]);

    return (
        <>
            <header className={styles.header}>
                <h1>{name}</h1>
                <TextField 
                    value={name}
                    onChange={(value) => renamePresentation(value)}
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
                <button onClick={addSlide} style={{ marginBottom: '20px' }}>
                    Add Slide
                </button>
                <button onClick={deleteSlides} style={{ marginBottom: '20px' }}>
                    Remove Slide
                </button>
                <button onClick={addScale} style={{ marginBottom: '20px' }}>
                    Add Scale
                </button>
                <button onClick={subScale} style={{ marginBottom: '20px' }}>
                    Sub Scale
                </button>
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
                    onChange={(value) => changeScale(value)} 
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
