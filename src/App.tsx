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
import { Button } from './components/button/Button.tsx';

type AppProps = {
    editor: EditorType; // Определяем тип для пропсов
}

function App({ editor }: AppProps) {
    const { presentation } = editor;
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

    const selectedSlide = presentation.slides.find(slide => slide.uid === presentation.selectedSlideIds[0]);

    return (
        <>
            <header className={styles.header}>
                <h1>{presentation.name}</h1>
                <TextField 
                    value={presentation.name}
                    onChange={(value) => onRenamePresentation(value)}
                />
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
                <Button value='button' onClick={() => console.log('click')}/>
                <NumberField 
                    value={presentation.scale.toString()} 
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
                    slides={ presentation.slides }
                    selectedSlideIds={ presentation.selectedSlideIds }
                />
                <WorkArea 
                    slide={selectedSlide} 
                    scale={presentation.scale}
                />
            </main>
            <footer className={styles.footer}>

            </footer>
        </>
    )
}

export default App
